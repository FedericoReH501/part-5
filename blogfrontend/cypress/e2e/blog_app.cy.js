describe('Note app', function() {
  beforeEach(function() {

    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user1 = {
      name: 'tester testone',
      username: 'User1',
      password: 'Benni1996!'
    }
    const user2 = {
      name: 'tester testoni',
      username: 'User2',
      password: 'Benni1996!'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user1)
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Blogs')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
  })

  it('user can login', function () {
    cy.contains('Login').click()
    cy.get('input:first').type('User1')
    cy.get('input:last').type('Benni1996!')
    cy.get('#loginbutton').click()
    cy.contains('User1 logged in')
  })

  describe('when logged in',() => {
    beforeEach(function() {
      cy.contains('Login').click()
      cy.get('input:first').type('User1')
      cy.get('input:last').type('Benni1996!')
      cy.get('#loginbutton').click()
    })

    it('login user can create a blog', function () {

      cy.contains('Add New Blog').click()
      cy.get('.titlein').type('Test Blog Title')
      cy.get('.authorin').type('tester')
      cy.get('.urlin').type('www.test.com')
      cy.get('#newformbutton').click()
      cy.contains('Test Blog Title, tester')
    })
    describe('after a blog is already present', function(){
      beforeEach(function (){
        cy.contains('Add New Blog').click()
        cy.get('.titlein').type('Test Blog Title')
        cy.get('.authorin').type('tester')
        cy.get('.urlin').type('www.test.com')
        cy.get('#newformbutton').click()
      })

      it('user can like a blog', function () {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('likes:1')
      })
      it('user can delete blogs',function(){
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.contains('Blog Removed Succesfully')

      })
      it('only creator can remove the blog',function(){
        cy.contains('LogOut').click()
        cy.contains('Login').click()
        cy.get('input:first').type('User2')
        cy.get('input:last').type('Benni1996!')
        cy.get('#loginbutton').click()
        cy.contains('view').click()
        cy.get('.blog').should('not.contain', 'remove')

      })
      it('blogs are sorted in the right order',function(){
        cy.contains('Add New Blog').click()
        cy.get('.titlein').type('most liked Blog')
        cy.get('.authorin').type('test')
        cy.get('.urlin').type('www.test.com')
        cy.get('#newformbutton').click()

        cy.get('.blog').eq(1).as('mostliked')
        cy.get('@mostliked').contains('view').click()
        cy.get('.blog').eq(1).as('mostlikedopen')
        cy.get('@mostlikedopen').contains('likes').as('likebutton')
        cy.get('@likebutton').click().wait(1500).click().wait(1500).click()
        cy.get('.blog').eq(0).contains('likes:3')
        cy.get('.blog').eq(0).contains('most liked Blog , test')
      })

    })
  })

})