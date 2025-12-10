/// <reference types="cypress"/>
const perfil = require('../../fixtures/perfil.json')
describe('Funcionalidade: Login', () => {

    beforeEach(() => {
      cy.visit ('minha-conta') 
       
    });

     afterEach(() => {
        cy.screenshot()
    });


    it('Deve fazer login com sucesso', () => {
        cy.get('#username').type('gabrielteste@123.com')
        cy.get('#password').type('teste123456')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, gabrielteste (não é gabrielteste? Sair)')
    })

it('Deve exibir uma mensagem de erro ao inserir usuário inválido', () => {
        cy.get('#username').type('gabriel@123.com')
        cy.get('#password').type('teste123456')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error').should('exist')
});

it('Deve exibir uma mensagem de erro ao inserir senha inválida', () => {
        cy.get('#username').type('gabrielteste@123.com')
        cy.get('#password').type('teste12000')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error').should('contain' , 'Erro: A senha fornecida para o e-mail gabrielteste@123.com está incorreta. Perdeu a senha?')
        cy.get('.woocommerce-error').should('exist')
});

it('Deve fazer login com sucesso - Usando massa de dados' , () =>{
       cy.get('#username').type(perfil.usuario)
       cy.get('#password').type(perfil.senha)
       cy.get('.woocommerce-form > .button').click()
       cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, gabrielteste (não é gabrielteste? Sair)')

});

it('Deve fazer login com sucesso - Usando Fixture' , () =>{
      cy.fixture('perfil').then(dados => {
       cy.get('#username').type(dados.usuario , {log: false})
       cy.get('#password').type(dados.senha , {log: false})
       cy.get('.woocommerce-form > .button').click()
       cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, gabrielteste (não é gabrielteste? Sair)')


      })
});

it('Deve fazer login com sucesso - usando comandos customizado', () => {
    cy.login('gabrielteste@123.com' , 'teste123456')
    cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, gabrielteste (não é gabrielteste? Sair)')
});

})