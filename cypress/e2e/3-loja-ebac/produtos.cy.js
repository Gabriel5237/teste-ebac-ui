/// <reference types="cypress"/>
import produtosPage from "../../support/page-objects/produtos.page";

describe('Funcionalidade: Produtos', () => {

    beforeEach(() => {
       produtosPage.visitarUrl()
    });

    it('Deve selecionar um produto da lista', () => {
        produtosPage.buscarProdutoLista('Ariel Roll Sleeve Sweatshirt')
        cy.get('#tab-title-description > a').should('contain' , 'Descrição')
        
    });

    it('Deve buscar um produto com sucesso', () => {
       let produto = 'Hawkeye Yoga Short'
       produtosPage.buscarProduto(produto)
       cy.get('.product_title').should('contain' , produto) 
    });

    it('Deve visitar a página do produto', () => {
        produtosPage.visitarProduto('Ajax Full-Zip Sweatshirt')
        cy.get('.product_title').should('contain' , 'Ajax Full-Zip Sweatshirt')
    });

    it('Deve adicionar produto ao carrinho', () => {
        let qtd = 7
        produtosPage.buscarProduto('Atlas Fitness Tank')
        produtosPage.addProdutoCarrinho('M', 'Blue', qtd)

        cy.get('.woocommerce-message').should('contain' , qtd + ' × “Atlas Fitness Tank” foram adicionados no seu carrinho.')       
    });

    it.only('Deve adicionar produto ao carrinho buscando da massa de dados', () => {
        cy.fixture('produtos').then(dados => {
        produtosPage.buscarProduto(dados[0].nomeProduto)
        produtosPage.addProdutoCarrinho(
            dados[0].tamanho, 
            dados[0].cor, 
            dados[0].quantidade)
        cy.get('.woocommerce-message').should('contain', dados[0].nomeProduto)
       
    })

        
    });    
});