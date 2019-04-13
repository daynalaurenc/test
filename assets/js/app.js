
// Ingredient category elements
var dairyPage = $(".dairy");
var meatPage = $(".meat");
var veggiesPage = $(".veggies");
var pantryPage = $(".pantry");
var seafoodPage = $(".seafood");
var fruitPage = $(".fruit");
var recipesPage = $(".recipe-content");
var submit = $(".submit");
var heart = $(".heart");

// Hide menues until selected
function homePage() {
    dairyPage.hide();
    meatPage.hide();
    veggiesPage.hide();
    pantryPage.hide();
    seafoodPage.hide();
    fruitPage.hide();
    recipesPage.hide();
    submit.hide(); 
}

homePage();

// Log in objects
var localUser = {};
var loginCheck = {};

// The API object contains methods for each kind of request we'll make
var API = {
    // User calls
    createUser: function(userObj) {
      return $.ajax({
        type: "POST",
        url: "/api/user",
        data: userObj,
        success: function(response) {
          localStorage.clear();
          localStorage.setItem("userId", response.id);
          localUser.id = localStorage.getItem("userId");
          console.log(localUser.id);
        }
      });
    },
    getUser: function(userName) {
      return $.ajax({
        url: "/api/user/" + userName,
        type: "GET",
        success: function(res) {
          loginCheck.id = res.id;
          loginCheck.password = res.password;
          console.log(res);
        }
      });
    },
    updateUser: function(userObj) {
      return $.ajax({
        url: "/api/user/" + userObj.id,
        type: "PUT",
        data: userObj
      });
    },

    // fridge calls
    getFridge: function(userId) {
      return $.ajax({
        url: "/api/fridge/" + userId,
        type: "GET",
        success: function(response) {
          // check the necessary boxes
          console.log(response);
        }
      });
    },
    addToFridge: function(fridgeObj) {
      return $.ajax({
        url: "/api/fridge",
        type: "POST",
        data: fridgeObj,
        success: function(response) {
          // Make the box checked
          console.log(response);
        }
      });
    },
    deleteFromFridge: function(fridgeId) {
      return $.ajax({
        url: "/api/fridge/",
        type: "DELETE",
        data: fridgeId,
        success: function(response) {
          // Uncheck the box?
          console.log(response);
        }
      });
    },

    // favorites calls
    getFavorites: function(userId) {
      return $.ajax({
        url: "/api/favorites/" + userId,
        type: "GET",
        success: function(response) {
          // create array of favorites
          console.log(response);
        }
      });
    },
    addToFavorites: function(favoritesObj) {
      return $.ajax({
        url: "/api/favorites",
        type: "POST",
        data: favoritesObj,
        success: function(response) {
          // Check heart
          console.log(response);
        }
      });
    },
    deleteFromFavorites: function(favoritesId) {
        return $.ajax({
            url: "/api/fridge/" + favoritesId,
            type: "DELETE",
            success: function(response) {
                // Uncheck the box?
                console.log(response);
            }
        });
    },

    // Spoonacular calls
    searchForIngredient: function(text) {
        return $.ajax({
            url: "/api/spoon/tiny/" + text,
            type: "GET",
            success: function(res) {
                console.log(res);
            }
        })
    },
    searchRecipeByIng: function(list) {
        return $.ajax({
            url: "/api/spoon/",
            type: "GET",
            data: list,
            success: function(res) {
                console.log(res);
            }
        })
    },
    searchRecipeById: function(id) {
        return $.ajax({
            url: "/api/spoon/recipe/" + id,
            type: "GET",
            success: function(res) {
                console.log(res);
            }
        })
    }
};



// The following expand various menus depending on what the user selects
function dairy() {
    var dairyClicked = $(".dairyBtn");

    dairyClicked.on('click', function () {
        dairyPage.show();
        meatPage.hide();
        veggiesPage.hide();
        pantryPage.hide();
        seafoodPage.hide();
        fruitPage.hide();
        recipesPage.hide();
        submit.show();
        heart.hide();
    })
}
dairy();

function meat() {
    var meatClicked = $(".meatBtn");

    meatClicked.on('click', function () {
        dairyPage.hide();
        meatPage.show();
        veggiesPage.hide();
        pantryPage.hide();
        seafoodPage.hide();
        fruitPage.hide();
        recipesPage.hide();
        submit.show();
        heart.hide();
    })
}
meat();

function veggie() {
    var veggieClicked = $(".veggieBtn");

    veggieClicked.on('click', function () {
        dairyPage.hide();
        meatPage.hide();
        veggiesPage.show();
        pantryPage.hide();
        seafoodPage.hide();
        fruitPage.hide();
        recipesPage.hide();
        submit.show();
        heart.hide();
    })
}
veggie();

function pantry() {
    var pantryClicked = $(".pantryBtn");

    pantryClicked.on('click', function () {
        dairyPage.hide();
        meatPage.hide();
        veggiesPage.hide();
        pantryPage.show();
        seafoodPage.hide();
        fruitPage.hide();
        recipesPage.hide();
        submit.show();
        heart.hide();
    })
}
pantry();

function seafood() {
    var seafoodClicked = $(".seafoodBtn");

    seafoodClicked.on('click', function () {
        dairyPage.hide();
        meatPage.hide();
        veggiesPage.hide();
        pantryPage.hide();
        seafoodPage.show();
        fruitPage.hide();
        recipesPage.hide();
        submit.show();
        heart.hide();
    })
}
seafood();

function fruits() {
    var fruitClicked = $(".fruitBtn");

    fruitClicked.on('click', function () {
        dairyPage.hide();
        meatPage.hide();
        veggiesPage.hide();
        pantryPage.hide();
        seafoodPage.hide();
        fruitPage.show();
        recipesPage.hide();
        submit.show();
        heart.hide();
    })
}
fruits();

// Set up temp user when user arrives to page
function setTemp() {
    if (localStorage.getItem("userId") === null) {
        // Create temp user
        var tempUser = {
          name: "temp",
          password: ""
        };
        localUser.name = tempUser.name;
        console.log(tempUser);
        // User post
        API.createUser(tempUser);
    } else {
        localUser.id = localStorage.getItem("userId");
        API.getFridge(localUser.id);
    }
}
setTemp();

// Function that activates the modal for singing up
function signup() {
    var signupClicked = $(".signup");

    signupClicked.on('click', function () {
        $(".modal2").modal();
    })
}
signup();

// Function for submitting sign up
function signUpSubmit () {
    $("#signup_submit").on("click", function(event) {
        event.preventDefault();
        console.log("button pressed");
        console.log(
        $("#user_name_signup")
            .val()
            .trim()
        );
        console.log($("#password_signup").val());
        // create user object
        var signUp = {
        name: $("#user_name_signup")
            .val()
            .trim(),
        password: $("#password_signup")
            .val()
            .trim()
        };
        var confirm = $("#password_confirm")
        .val()
        .trim();

        console.log(signUp.name + " " + signUp.password + " " + confirm);
        // check to make sure both inputs are present
        if (!(signUp.name && signUp.password)) {
        alert("You must enter an example text and description!");
        return;
        } else if (signUp.password !== confirm) {
            alert("Password did not match");
        } else {
            // Create permanent user
            if (localUser.name === "temp") {
                signUp.id = localUser.id;
                API.updateUser(signUp);
            } else {
                API.createUser(signUp);
            }
        }
        // What happens when you submit sign up
        // Right now, you are able to sign up with the same user name as someone else

    });
};
signUpSubmit();

// Function that activates the modal for logging in
function login() {
    var loginClicked = $(".login");

    loginClicked.on('click', function () {
        $(".modal1").modal();
    })
}
login();

// Function for submitting login
function loginSubmit () {
    // What happens when you submit log in
    $("#login_submit").on("click", function(event) {
        event.preventDefault();
        // Create object from user input (name password)
        var login = {
            name: $("#user_name_login")
                .val()
                .trim(),
            password: $("#password_login")
                .val()
                .trim()
        };
        // User GET with that object based on object.name
        API.getUser(login.name);
        if (login.password === loginCheck.password) {
            localStorage.setItem("userId", login.id);
            alert("Welcome, " + login.name + "!");
        } else {
            alert("Username or password did not match.");
        }
        // GET fridge based on id
        // Set all the ingredients to their fridge values
    });
};
loginSubmit();

// Want to sign up modal?
function clickSearch() {
    var searchClicked = $(".submit");

    searchClicked.on('click', function () {
        $(".modal3").modal();
    })
}

// Search for recipe
function findRecipes() {
    var submitClicked = $("#submit");

    submitClicked.on('click', function () {
        recipesPage.show();
        heart.hide();
    })
}
clickSearch();
findRecipes();

$('#modal-login').click((event) => {
    $('#search').modal();
    $('#login').modal({onCloseEnd:function(){
        console.log("closeing modal login");
        $('body').css('overflow', '');
    }});
    $('#login').modal('open');
})

$('#modal-signup').click((event) => {
    $('#search').modal();
    $('#signup').modal({onCloseEnd:function(){
        console.log("closeing modal login");
        $('body').css('overflow', '');
    }});
    $('#signup').modal('open');
})

$("body").on("click", '.addition', function(event){
    event.preventDefault();
    var category = $(this).data('category');
    var inputId = category + '-ingredient'
    var input = $("#" + inputId).val().trim();
    var prependHere = $('.' + category + ' .prepend-here');
    // var ingredMenu = $(`#${category}-ingred-menu`);
    //$('.add-ingred').remove();
    var checkbox = $(`
        <div class="col s12 l3">
            <form action="#">
            <p>
                <label>
                <input type="checkbox" />
                <span>${input}</span>
                </label>
            </p>
            </form>
        </div>
    `)

    checkbox.insertBefore(prependHere);
    // ingredMenu.append(checkbox);
    
    $(`#${category}-ingredient`).val('');
    $(`#${category}-ingredient`).focus();

    console.log(input);
})

// When an ingredient item checkbox is clicked
$('body').on('click', 'input[type="checkbox"]', function() {
    var fridgeItem = {
        name: $(this).next().text().toLowerCase(),
        UserId: localStorage.getItem("userId")
    }
    console.log(fridgeItem);
    // if they checked it, add the item
    if ( $(this).prop("checked") ) {
        console.log("Adding item");
        API.addToFridge(fridgeItem);
    } else {
        // if they unchecked it, destroy the item
        console.log("Deleting item");
        console.log(fridgeItem);
        API.deleteFromFridge(fridgeItem);
    }
});

function findRecipes(){
    var submitClicked = $("#submit");

    submitClicked.on('click', function(){
        recipesPage.show();
    })
}

findRecipes();

function favorite(){
    var saveClicked = $(".save");

    saveClicked.on('click', function(event){
        event.preventDefault();
        heart.show();
    })
}
favorite();


