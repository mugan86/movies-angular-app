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

    cy.get("app-basic-info-card")
      .find("img")
      .should("have.attr", "src")
      .should("include", staticResponse[0].poster);
    cy.get("app-basic-info-card img")
      .last()
      .should("have.attr", "src")
      .should("include", staticResponse[staticResponse.length - 1].poster);

    // ===== CSS ======
    cy.get(".cover").invoke("css", "object-fit").should("equal", "cover");
    cy.get(".cover").invoke("css", "max-height").should("equal", "200px");

    // Hashtags

    cy.get("app-basic-info-card .card-text")
      .first()
      .should("have.text", "#comedy\n#action\n");
    cy.get("app-basic-info-card .card-text")
      .last()
      .should("have.text", "#horror\n#thriller\n");
    cy.get("app-hashtag small")
      .invoke("css", "color")
      .should("equal", "rgb(108, 117, 125)");
  });

  it("Comprobar características del menú hamburguesa del navbar", () => {
    cy.get(".navbar-brand button")
      .invoke("css", "cursor")
      .should("equal", "pointer");
    cy.get(".navbar-brand button i")
      .should("have.attr", "class")
      .should("include", "fa-solid fa-bars");
  });

  it("Abrir menú lateral (Sidebar) y ver las opciones y acciones", () => {
    // Sidebar cerrado
    cy.get(".sidebar").invoke("css", "visibility").should("equal", "hidden");

    // Abrir Sidebar
    cy.get(".navbar-brand button").click();

    cy.wait(2500);

    // Sidebar expandido con sus opciones
    cy.get(".sidebar").invoke("css", "visibility").should("equal", "visible");

    // Sidebar abierto - Título del menú
    cy.get(".sidebar-header .offcanvas-title").contains("Menu");
    // Sidebar Nav Links
    cy.get(".sidebar-body-nav").children().should("have.length", 3);

    // Sidebar Nav Links - Elementos y sus textos
    cy.get(".sidebar-body-nav")
      .children()
      .first()
      .should("have.text", "Películas")
      .next()
      .should("have.text", "Actores")
      .next()
      .should("have.text", "Compañías");

    cy.get(".sidebar-header__button").click();
    cy.wait(1000);
  });

  it("Comprobar características del navbar", () => {
    cy.get(".navbar span").contains("Películas");
    cy.get(".navbar").invoke("css", "color").should("equal", "rgb(33, 37, 41)");
    cy.get(".navbar")
      .invoke("css", "background-color")
      .should("equal", "rgb(248, 249, 250)");
  });

  it("Comprobar características del botón para añadir películas", () => {
    cy.get(".movie__button-new i")
      .should("have.attr", "class")
      .should("include", "fa-solid fa-plus");
    cy.get(".movie__button-new")
      .invoke("css", "cursor")
      .should("equal", "pointer");
    cy.get(".movie__button-new")
      .invoke("css", "color")
      .should("equal", "rgb(0, 0, 0)");
    cy.get(".movie__button-new")
      .invoke("css", "background-color")
      .should("equal", "rgb(255, 193, 7)");
    cy.get(".movie__button-new")
      .invoke("css", "border-color")
      .should("equal", "rgb(255, 193, 7)");
  });

  it("Navegar al formulario de crear una película", () => {
    cy.get(".movie__button-new").click();
    
    
    cy.url().should("equal", "http://localhost:4200/#/movies/add");

    // Volver a lista de películas
    cy.visit("http://localhost:4200");
  });

  it("Navegar a detalles de una película", () => {
    cy.get("app-basic-info-card").first().click();
    
    
    cy.url().should("equal", "http://localhost:4200/#/movies/1");

    // Volver a lista de películas
    cy.visit("http://localhost:4200");
  });
});
