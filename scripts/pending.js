(function (window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function PendingList(selector) {
      if(!selector){
        throw new Error('No selector provided to PendingList constructor');
      }

       this.$pendingListElement = $(selector);

      if(this.$pendingListElement.length === 0){
         throw new Error('Cant fine element with selector:' + selector);
      }
  }

  function  TableRow(taskData) {
        var $tr
        if(taskData.priority ==="high"){
          $tr = $('<tr></tr>', {'class': 'danger'});
        }
        else if (taskData.priority ==="normal"){
          $tr = $('<tr></tr>', {'name': taskData.task});
        }
        var $tdName = $('<td></td>');
        $tdName.append(taskData.task);  //
        var $tdDuration = $('<td></td>', {'data-target': taskData.task});
        var durationString = taskData.duration + " minutes left";
        $tdDuration.append(durationString);
        var $tdButton = $('<td></td>')
        var inSeconds = taskData.duration*60;
        var $startButton = $('<button></button>', {'class': 'btn btn-info btn-block', 'type': 'button', 'value': inSeconds, 'data-selector': taskData.task, 'data-timer-handle': 0});
        $startButton.append('Start timer');
        var $completeButton = $('<button></button>', {'class': 'btn btn-success btn-block', 'type': 'button', 'name': taskData.task});
        $completeButton.append('Task Completed');
        $tdButton.append($startButton);
        $tdButton.append(" ");
        $tdButton.append($completeButton);
        $tr.append($tdName);
        $tr.append($tdDuration);
        $tr.append($tdButton);

        this.$element = $tr;  }

PendingList.prototype.addRow = function (taskData) {
      var newRow = new TableRow(taskData);
      this.$pendingListElement.append(newRow.$element);
};

PendingList.prototype.removeRow = function (taskName) {
      this.$pendingListElement.find('[name="' + taskName + '"]').closest("tr").remove();
};
  //this.$element.find('[value="' + email + '"]').closest('[data-coffee-order="checkbox"]').remove();
PendingList.prototype.addCompletedHandler = function (fncomplete, fntimer) {
      this.$pendingListElement.on('click', "button", function (event){
        if(event.target.getAttribute("name") != null){
          fncomplete(event.target.name);}
        else{
            fntimer(event.target);
        }
      });

    };

    PendingList.prototype.startTimer = function (eventElement, $targetElement) {
          eventElement.innerHTML = "Stop timer";

          var handle = setInterval(function () {
                if(eventElement.getAttribute('value') > 0){

                    var count = eventElement.getAttribute('value') -1;

                    var division = count/60
                    var location =  division.toString().indexOf('.');
                    if(location === -1){
                      var minutes = division;
                    }
                    else{
                    var minutes = division.toString().substring(0, location);
                      }
                    var seconds = count%60;

                    $targetElement.text(minutes + " m and " + seconds + " s left");
                    eventElement.setAttribute('value', count);
                  }

                  eventElement.setAttribute('data-timer-handler', handle);
        }, 1000);

        //maybe move tbis
    };
    PendingList.prototype.stopTimer = function (eventElement) {
         eventElement.innerHTML = "Start timer";
        clearInterval(eventElement.getAttribute('data-timer-handler'));
    };


  /*  PendingList.prototype.addCompletedHandler = function (fn) {
          this.$pendingListElement.on('click', "button", function (event){
          //    if(event.target.value){
              fn(event.target.value);//}
            })

        };  */


    App.PendingList = PendingList;
    window.App = App;

})(window);
/*PendingList.prototype.addCompletedHandler = function (fn) {
      this.$pendingListElement.on('click', "button", function (event){
          this.removeRow(event.target.name);
          this.taskName;
      }.bind(this))
      fn(this.$pendingListElement.name);
    } */
