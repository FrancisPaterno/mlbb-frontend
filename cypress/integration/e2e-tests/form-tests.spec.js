context('Form Validations', () => {
    beforeEach(()=>{
        cy.visit('/');
    })

    function randomString() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
        for (var i = 0; i < 10; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
    
        return text;
      }

      function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
      }
    it('show add form and validate form title', () => {
        cy.get('#btn-add').click();
        cy.get('.form-title').should('have.html','Add Hero');
    });

    it('show edit from and validate from title', () => {
        cy.wait(500);
        cy.get('.btn-info').first().click();
        cy.get('.form-title').should('have.html','Edit Hero');
    });

    it('add valid data to form', () => {
        let xname = randomString();
        cy.get('#btn-add').click();
        cy.get('#name').type(xname,{delay:100});
        cy.get('#code').type(getRndInteger(300,1000),{delay:100});
        cy.get('#role').click();
        cy.get('ul>option').eq(1).click();
        cy.get('#specialty').type(randomString(),{delay:100});
        cy.get('#videoId').type('PjZmxzHNTvg');
        cy.get('.save').click();
        cy.wait(500);
        cy.get('table').contains(xname);

    });

    it('edit a record and save', () => {
        let xname = 'Test update name';
        cy.get('.btn-info').last().click();
        cy.get('#name').focus().clear().type(xname,{delay:100});
        cy.get('.save').click();
        cy.wait(500);
        cy.get('table').contains(xname);
    });
    
    it('delete a record', () => {

        cy.get('.hname').last().invoke('text').then((text)=>{
            console.log('Hero Name',text);
            cy.get('.btn-danger').last().click();
            cy.wait(100);
            cy.get('table').should('not.contain', text);
        });
      

        
       
    });

    it('watch a tutorial video of a hero', () => {
        cy.get('.btn-dark').last().click();
        cy.wait(1000);
        cy.get('.heroVideo').should('be.visible');
    });
});