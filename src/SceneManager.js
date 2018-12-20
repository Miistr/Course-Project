function SceneManager(eventManager) {
  this._eventManager = eventManager;
  this._scene = null;
  this._timer = this.timer();
  console.log(this._timer);
}

SceneManager.prototype.setScene = function (scene) {
  this._scene = scene;
};

SceneManager.prototype.getScene = function () {
  return this._scene;
};

SceneManager.prototype.toLoadingScene = function () {
  this._eventManager.removeAllSubscribers();
  this._scene = new LoadingScene(this);
};

SceneManager.prototype.toMainMenuScene = function (arrived) {
  this._eventManager.removeAllSubscribers();
  this._scene = new MainMenuScene(this);

  if (arrived) {
    this._scene.nextMenuItem();
    this._scene.arrived();
  }
};

SceneManager.prototype.toGameScene = function (stage, player) {
  this._eventManager.removeAllSubscribers();
  this._scene = new GameScene(this, stage, player);
  this._timer.reset();
  this._timer.start();
};

SceneManager.prototype.toConstructionScene = function () {
  this._eventManager.removeAllSubscribers();
  this._scene = new Construction(this);
};

SceneManager.prototype.toStageStatisticsScene = function (stage, player, gameOver) {
  this._eventManager.removeAllSubscribers();
  this._scene = new StageStatisticsScene(this, stage, player, gameOver);
};

SceneManager.prototype.toGameOverScene = function () {
  this._eventManager.removeAllSubscribers();
  this._scene = new GameOverScene(this);
  this._timer.stop();
};

SceneManager.prototype.update = function () {
  this._scene.update();
};

SceneManager.prototype.draw = function (ctx) {
  this._scene.draw(ctx);
};

SceneManager.prototype.getEventManager = function () {
  return this._eventManager;
};

SceneManager.prototype.timer = function () {
  var min, sec, ms, count, malt, salt, msalt;
  var stopwatch = {
    start: function () {

      ms = 0;
      sec = 0;
      min = 0;
      count = setInterval(function () {
        if (ms == 100) {
          ms = 0;
          if (sec == 60) {
            sec = 0;
            min++;
          }
          else {
            sec++;
          }
        }
        else {
          ms++;
        }

        malt = stopwatch.pad(min);
        salt = stopwatch.pad(sec);
        msalt = stopwatch.pad(ms);

        stopwatch.update(malt + ":" + salt + ":" + msalt);
      }, 10);
    },
    stop: function () {
      clearInterval(count);
    },
    reset: function () {
      stopwatch.stop();
      var temp = document.getElementById("timer");
      temp.firstChild.nodeValue = "00:00:00";
    },
    update: function (txt) {
      var temp = document.getElementById("timer");
      temp.firstChild.nodeValue = txt;
    },

    pad: function (time) {
      var temp;
      if (time < 10) {
        temp = "0" + time;
      }
      else {
        temp = time;
      }
      return temp;
    }
  }
  return stopwatch;
}
