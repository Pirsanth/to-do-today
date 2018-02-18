(function (window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery



  function CompletedList(completeListSelector, clearButtonSelector, noTasksSelector, taskListSelector) {
    if(!completeListSelector || !clearButtonSelector || !noTasksSelector || !taskListSelector){
      throw new Error('All required selectors not specified');
    }

    this.$completedList = $(completeListSelector);
    this.$clearButton = $(clearButtonSelector);
    this.$noTasks = $(noTasksSelector);
    this.$taskList = $(taskListSelector);

    if(this.$completedList.length === 0 || this.$clearButton.length === 0 || this.$noTasks.length === 0 || this.$taskList.length === 0){
      throw new Error('Some selectors failed to return a match. Please check selectors provided');
      }

      this.isEmpty = true;
  }

  CompletedList.prototype.addTask = function (task) {
    if(this.isEmpty){
        this.toFilledList();
    }

      var $li = $('<li></li>');
      var description = task;
      $li.append(description);
      this.$completedList.append($li);

  };

CompletedList.prototype.addClearButtonHandler = function () {
    this.$clearButton.on('click', function () {
          this.toEmptyList();
    }.bind(this));
};
CompletedList.prototype.toFilledList = function () {
      this.$noTasks.detach();
      this.$clearButton.removeAttr('style');
      this.isEmpty = false;
};
CompletedList.prototype.toEmptyList = function () {
    this.$taskList.empty();
    this.$taskList.append(this.$noTasks);
    this.$clearButton.hide();
    this.isEmpty = true;
}


  App.CompletedList = CompletedList;
  window.App = App;

})(window);
