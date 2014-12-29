$(function() {
var model = [
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
];

var buttonsView = {
  init: function() {
    this.buttons = $('#buttonsdiv');
    this.render();
    this.buttons.on('click', 'button', function() {
      //views can talk to views? idk
      catsView.render($(this).text());
    });
  },
  render: function() {
    var self = this;
    octopus.getCats().forEach(function(cat) {
      var catbutton = $('<button/>', {
        text: cat.name
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
  },
  render: function(name) {
    var cat = octopus.getCat(name);
    this.catName.html(cat.name);
    this.img.attr('src', cat.src);
    this.counter.html(cat.counter);
  }
};

var octopus = {
  init: function() {
    buttonsView.init();
    catsView.init();
  },
  getCats: function() {
    return model;
  },
  getCat: function(name) {
    for (var i=0;i<model.length;i++) {
      if (model[i].name === name) {
        return model[i];
      }
    }
  },
  updateCounter: function(name) {
    model.forEach(function(cat) {
      if (cat.name === name) {
        cat.counter++;
      }
    });
  }
};
octopus.init();
});