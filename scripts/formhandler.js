(function(window) {
'use strict';
var App = window.App || {};
var $ = window.jQuery;

function FormHandler(formSelector, rangeSelector, displaySelector) {
  if (!formSelector || !rangeSelector || !displaySelector){
      throw new Error('All required selectors not specified');
  }
    this.$formElement = $(formSelector);
    this.$rangeElement = $(rangeSelector);
    this.$displayElement = $(displaySelector);

  if (this.$formElement.length === 0 || this.$rangeElement.length === 0 || this.$displayElement.length === 0){
          throw new Error('Some selectors did not return search results, please check selectors');
      }
}

//do not forget to pass a fn
FormHandler.prototype.addSubmitHandler = function (fn) {
        console.log('adding a submit handler');
        this.$formElement.on('submit', function (event) {
            event.preventDefault();
            var data={};
            $(this).serializeArray().forEach(function(index) {
                  data[index.name] = index.value;
            })
            console.log(data);
            fn(data);
            this.reset();
          
        })
      };
FormHandler.prototype.addRangeHandler = function () {
  this.$rangeElement.on("input change", function() {
        var value = this.$rangeElement.val();
        this.$displayElement.text(value + " minutes");
  }.bind(this));

};


        App.FormHandler = FormHandler;
        window.App = App;

})(window);
