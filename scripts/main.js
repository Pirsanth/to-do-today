(function(window) {
  'use strict';
  var App = window.App;
  var FormHandler = App.FormHandler;
  var PendingList = App.PendingList;
  var CompletedList = App.CompletedList;
  var FORM_SELECTOR = '[data-form="form"]';
  var RANGE_SELECTOR = '[data-slider="range"]'
  var DISPLAY_SELECTOR = '[data-slider="display"]'
  var PENDING_LIST_SELECTOR = '[data-pending="list"]';
  var COMPLETED_LIST_SELECTOR = '[data-completed="list"]';
  var COMPLETED_LIST_CLEAR_BUTTON_SELECTOR = '[data-completed="clear"]';
  var COMPLETED_LIST_NO_TASKS_SELECTOR = '[data-completed="no-tasks"]';
  var COMPLETED_LIST_TASK_LIST = '[data-completed="list"]';
  var formHandler = new FormHandler(FORM_SELECTOR, RANGE_SELECTOR, DISPLAY_SELECTOR);
  var pendingList = new PendingList(PENDING_LIST_SELECTOR);
  var completedList = new CompletedList(COMPLETED_LIST_SELECTOR, COMPLETED_LIST_CLEAR_BUTTON_SELECTOR, COMPLETED_LIST_NO_TASKS_SELECTOR, COMPLETED_LIST_TASK_LIST);

  formHandler.addRangeHandler();
  formHandler.addSubmitHandler(function (data) {
    pendingList.addRow.call(pendingList, data);
  });

  pendingList.addCompletedHandler(function (taskName) {
      pendingList.removeRow.call(pendingList, taskName);
      completedList.addTask.call(completedList, taskName);
  }, function (eventElement) {

        if(eventElement.innerHTML === "Start timer"){
      var $targetElement = this.$pendingListElement.find('[data-target="' + eventElement.getAttribute('data-selector') + '"]');
      pendingList.startTimer(eventElement, $targetElement);

    }

        else if (eventElement.innerHTML === "Stop timer"){
          pendingList.stopTimer(eventElement);

        }

  }.bind(pendingList));
  completedList.addClearButtonHandler();
//dont forget to redeclare the value of the timer button
})(window);
