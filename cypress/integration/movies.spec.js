describe("Lista de películas", () => {
  const staticResponse = [
    {
      title: "Dancing Lady",
      poster: "http://dummyimage.com/400x600.png/cc0000/ffffff",
      genre: ["Comedy", "Action"],
      actors: [4, 5, 6],
      year: 2006,
      duration: 161,
      imdbRating: 8.27,
      id: 1,
    },
    {
      title: "Mooring, The",
      poster: "http://dummyimage.com/400x600.png/dddddd/000000",
      genre: ["Horror", "Thriller"],
      actors: [5, 6],
      year: 1987,
      duration: 187,
      imdbRating: 1.99,
      id: 2,
    },
  ];
  beforeEach(() => {
    // Para Mockear la respuesta de la API sin tener que usarla
    // tenemos que introducir la misma ruta que en la app y listo
    // https://docs.cypress.io/api/commands/intercept#With-a-StaticResponse-object

    cy.intercept("/movies", staticResponse);
    cy.visit("http://localhost:4200");
  });

  it("Películas - Contenido principal de las tarjetas", () => {
    cy.get("app-basic-info-card").should("have.length", staticResponse.length);

    // Títulos
    cy.get("app-basic-info-card .card-title")
      .first()
      .should("have.text", staticResponse[0].title);
    cy.get("app-basic-info-card .card-title")
      .last()
      .should("have.text", staticResponse[staticResponse.length - 1].title);

    // Imágenes

    cy.get("app-basic-info-card").find('img').should('have.attr', 'src').should('include',staticResponse[0].poster)
    cy.get("app-basic-info-card img").last().should('have.attr', 'src').should('include',staticResponse[staticResponse.length - 1].poster)
    

    // Hashtags

    // card-text

    cy.get("app-basic-info-card .card-text").first().should("have.text", '#comedy\n#action\n');
    cy.get("app-basic-info-card .card-text").last().should("have.text", '#horror\n#thriller\n');


  });

  /*it("Check Country element take correct base styles", () => {
    cy.get("li").invoke("css", "cursor").should("equal", "pointer");
    cy.get("li").invoke("css", "width").should("equal", "300px");
  });

  it("should display city when clicking on country", () => {
    cy.contains("Spain").click();
    cy.get("h1").contains("Madrid");
  });*/

  /*it("Check City element take correct base styles", () => {
      cy.contains("Spain").click();
  
      cy.get("h1").invoke("css", "position").should("equal", "fixed");
  
      cy.get("h1").invoke("css", "color").should("equal", "rgb(255, 255, 255)");
  
      cy.get("h1").invoke("css", "top").should("equal", "20px");
  
      cy.get("h1").invoke("css", "right").should("equal", "0px");
  
      cy.get("h1").invoke("css", "text-align").should("equal", "right");
  
      cy.get("h1")
        .invoke("css", "background-color")
        .should("equal", "rgba(133, 194, 10, 0.7)");
    });*/
});
