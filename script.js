$(function() {
var model = {
  cats: [
    {
      name: "cat1",
      src: "cat1.jpg",
      counter: 0
    },
    {
      name: "cat2",
      src: "cat2.jpg",
      counter: 0
    }
  ],
  currentCat: null
};

var buttonsView = {
  init: function() {
    this.buttons = $('#buttonsdiv');
    this.render();
  },
  render: function() {
    this.buttons.html('');
    var self = this;
    octopus.getCats().forEach(function(cat) {
      var catbutton = $('<button/>', {
        text: cat.name,
        click: function() {
          //views can talk to views? idk
          octopus.setCurrentCat(cat);
          adminView.hide();
          catsView.render();
        } 
      });
      self.buttons.append(catbutton);
    });
  }
};

var catsView = {
  init: function() {
    this.catDisplay = $('#catdisplaydiv');
    this.catName = $('#catname');
    this.counter = $('#counter');
    this.img = $('#catpic');
    var self = this;
    this.catDisplay.on('click', '#catpic', function() {
      var cat = self.catName.text();
      var count = octopus.getCat(cat).counter;
      count++;
      self.counter.html(count);
      octopus.updateCounter(cat);
    });
    this.render();
  },
  render: function() {
    var cat = octopus.getCurrentCat();
    this.catName.html(cat.name);
    this.img.attr('src', cat.src);
    this.counter.html(cat.counter);
  }
};

var adminView = {
  init: function() {
    this.view = $('#adminview > form');
    this.name = $('#name');
    this.url = $('#url');
    this.numClicks = $('#numclicks');
    $('#adminbtn').on('click', function() {
      adminView.render();
    });
    $('#cancel').on('click', function(e) {
      adminView.hide();
      e.preventDefault();
    });
    $('#save').on('click', function(e) {
      adminView.save();
      e.preventDefault();
    });
  },
  render: function() {
    this.show();
    var cat = octopus.getCurrentCat();
    this.name.val(cat.name);
    this.url.val(cat.src);
    this.numClicks.val(cat.counter);
  },
  hide: function() {
    this.view.hide();
  },
  show: function() {
    this.view.show();
  },
  save: function() {
    var update = {
      name: this.name.val(),
      src: this.url.val(),
      counter: this.numClicks.val()
    };
    octopus.updateCat(update);
    this.hide();
  }
};

var octopus = {
  init: function() {
    model.currentCat = model.cats[0];
    buttonsView.init();
    catsView.init();
    adminView.init();
  },
  getCats: function() {
    return model.cats;
  },
  getCat: function(name) {
    for (var i=0;i<model.cats.length;i++) {
      if (model.cats[i].name === name) {
        return model.cats[i];
      }
    }
  },
  setCurrentCat: function(cat) {
    model.currentCat = cat;
  },
  getCurrentCat: function() {
    return model.currentCat;
  },
  updateCounter: function(name) {
    model.cats.forEach(function(cat) {
      if (cat.name === name) {
        cat.counter++;
      }
    });
  },
  updateCat: function(updated) {
    var currentCat = this.getCurrentCat();
    model.cats.forEach(function(cat, i) {
      if (cat.name === currentCat.name) {
        model.cats[i] = updated;
        octopus.setCurrentCat(model.cats[i]);
      }
    });
    buttonsView.render();
    catsView.render();
  }
};
octopus.init();
});