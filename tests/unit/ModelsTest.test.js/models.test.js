const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');
const connection = require('../../../models/connection');

const productsModel = require('../../../models/productsModel');



describe("Busca todos os produtos", () => {
  describe("Caso Erro", async () => {
    before(async () => {
      const products = [[]];
      sinon.stub(connection, "query").resolves(products);
    });
    after(async () => {
      connection.query.restore();
    });
    it("retorna null", async () => {
      const response = await productsModel.getAll();
      expect(response).to.be.equal(null);
    });
  });

  describe('Caso OK', async() => {
    const products = [[
      {
        id: 1,
        name: "Martelo de Thor",
      },
      {
        id: 2,
        name: "Traje de encolhimento",
      },
      {
        id: 3,
        name: "Escudo do Capitão América",
      },
    ]];
    before(async() => {
      sinon.stub(connection, 'query').resolves(products)
    })
    after(async() => {
      connection.query.restore();
    });
    it('retorna um array', async function () {
      const resultado = await productsModel.getAll();
      expect(resultado).to.be.an('array');
    });
    it('retorna os produtos', async () => {
      const response = await productsModel.getAll();
      expect(response[0]).includes.all.keys("id", "name");
      expect(response[0]).to.have.a.property("id");
    });
  });

  describe("Filtra um produto pelo id", () => {
    describe("Caso ERRO", async () => {
      before(async () => {
        const products = [[]];
        sinon.stub(connection, "query").resolves(products);
      });
      after(async () => {
        connection.query.restore();
      });
      it("retorna null", async () => {
        const response = await productsModel.getById(1);
        expect(response).to.be.equal(null);
      });
    });
  });

  describe("Caso OK", async () => {
      const id = 1;
      const products = [[{
          id: 1,
          name: "Martelo de Thor",
        }]];
        before(async () => {
          sinon.stub(connection, "query").resolves(products);
        });
        after(async () => {
          connection.query.restore();
        });
        it("Retorna um objeto", async () => {
          const response = await productsModel.getById(id);
          expect(response).to.be.a("object");
        });
        it("Retorna os produtos", async () => {
          const response = await productsModel.getById(id);
          expect(response).includes.all.keys("id", "name");
          expect(response).to.have.a.property("id");
        });
    });
});
  
  describe('Insere um novo produto', () => {
  const product = {
        name: 'ProdutoY'
  };

  before(async () => {
    const query = [{ insertId: 3 }]; // retorno esperado nesse teste

    sinon.stub(connection, 'query').resolves(query);
  });

  after(async () => {
    connection.query.restore();
  });

  describe('Caso OK', async () => {

    it('retorna um objeto', async () => {
      const response = await productsModel.createProducts(product);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui o "id" do novo filme inserido', async () => {
      const response = await productsModel.createProducts(product);

      expect(response).to.have.a.property('id');
    });
  });
});

describe("Quando atualiza um producto pelo Id", () => {
  describe("quando o produto não existe", async () => {
    before(async () => {
      const products = [[]];
      sinon.stub(connection, "query").resolves(products);
    });

    after(async () => {
      connection.query.restore();
    });

    it("deve retornar null", async () => {
      const response = await productsModel.updateProducts(1, "ProductZ");
      expect(response).to.be.equal(null);
    });
  });

  describe("quando é pesquisado com sucesso", async () => {
    const id = 1;
    const name = 'Martelo de Thor';
    const products = [
      [
        {
          id: 1,
          name: "Martelo de Thor",
        },
      ],
    ];
    before(async () => {
      sinon.stub(connection, "query").resolves(products);
    });

    after(async () => {
      connection.query.restore();
    });

    it("Retorna um objeto", async () => {
      const response = await productsModel.updateProducts(id, name);
      expect(response).to.be.a("object");
      expect(response).to.not.be.empty;
      expect(response).includes.all.keys("id", "name");
      expect(response).to.have.a.property("id");
    });
  });
}); 
