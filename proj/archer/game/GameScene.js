
var Res = {
background          : 'res/bg.png',
target              : 'res/target.png',
target_hitted       : 'res/target_hitted.png',
bow                 : 'res/bow.png',
onbow               : 'res/onbow.png',
phoniex             : 'res/phoniex.png',
dragon_animation    : 'res/dragon_animation.png',
token               : 'res/token.png',
ball_green          : 'res/ball_green.png',
ball_yellow         : 'res/ball_yellow.png',
ball_grey           : 'res/ball_grey.png',

nil                 : ''
};

function scenes(){
  this.level() = function(){} 
  this.archer() = function(){}
  this.token() = function(){}
}

var LeveleEmpty= function(){
  function start(){
    cc.LoaderScene.preload([ Res.background ], function () {
      // welcome scene
      var Scene = cc.Scene.extend({
        onEnter:function () {
          this._super();
          var size = cc.director.getWinSize();

          var background = cc.Sprite.create( Res.background );
          background.attr({
            anchorX : 0.5,
            anchorY : 0.5,
            x : cc.winSize.width/2,
            y : cc.winSize.height/2
          });
          this.addChild(background, 0);

          // Phoniex
          var phoniex = cc.Sprite.create( Res.phoniex );
          phoniex.attr({
            anchorX : 0.5,
            anchorY : 0.5,
            x : cc.winSize.width/2,
            y : cc.winSize.height/2
          });
          phoniex.setScale(0.1);
          var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
              onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                if (cc.rectContainsPoint(rect, locationInNode)){
                  cc.log("hit! x:" + locationInNode.x + " y:" + locationInNode.y);
                  target.opacity = 180;
                  return true; 
                }else{
                  cc.log("not hit!");
                  target.opacity = 255;
                  return true;
                }
                return false;
              },
              onTouchesMoved: function (touches, event) {
                return false;
              },
              onTouchEnded: function (touch, event) {
                return false;
              }
            }
          );
          cc.eventManager.addListener(listener, phoniex);
          this.addChild(phoniex, 1);

          var rotate  = cc.RotateBy.create(2, 360);
          var scale   = cc.ScaleTo.create(2.0, 1.5);
          phoniex.runAction(rotate);
          phoniex.runAction(scale);
        }// end onEnter
      });
      // 
      cc.director.runScene(new Scene());
    });
  }
  start();
}
var LeveleWelcome = function(){
  function start(){
    cc.LoaderScene.preload([ Res.background ], function () {
      // welcome scene
      var Scene = cc.Scene.extend({
        onEnter:function () {
          this._super();
          var size = cc.director.getWinSize();

          var background = cc.Sprite.create( Res.background );
          background.attr({
            anchorX : 0.5,
            anchorY : 0.5,
            x : cc.winSize.width/2,
            y : cc.winSize.height/2
          });
          this.addChild(background, 0);

          // Phoniex
          var phoniex = cc.Sprite.create( Res.phoniex );
          phoniex.attr({
            anchorX : 0.5,
            anchorY : 0.5,
            x : cc.winSize.width/2,
            y : cc.winSize.height/2
          });
          phoniex.setScale(0.1);
          var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
              onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                if (cc.rectContainsPoint(rect, locationInNode)){
                  cc.log("hit! x:" + locationInNode.x + " y:" + locationInNode.y);
                  target.opacity = 180;

                  scenes.archer = new LeveleArcher(); // jump to archer
                  return true; 
                }else{
                  cc.log("not hit!");
                  target.opacity = 255;
                  return true;
                }
                return false;
              },
              onTouchesMoved: function (touches, event) {
                return false;
              },
              onTouchEnded: function (touch, event) {
                return false;
              }
            }
          );
          cc.eventManager.addListener(listener, phoniex);
          this.addChild(phoniex, 1);

          var rotate  = cc.RotateBy.create(1, 360);
          var scale   = cc.ScaleTo.create(1, 1.5);
          phoniex.runAction(rotate);
          phoniex.runAction(scale);

          // dragon
          var texture = cc.textureCache.addImage( Res.dragon_animation );
          var frame0 = cc.SpriteFrame.createWithTexture(texture, cc.rect(132 * 0, 132 * 0, 132, 132));
          var frame1 = cc.SpriteFrame.createWithTexture(texture, cc.rect(132 * 1, 132 * 0, 132, 132));
          var frame2 = cc.SpriteFrame.createWithTexture(texture, cc.rect(132 * 2, 132 * 0, 132, 132));
          var frame3 = cc.SpriteFrame.createWithTexture(texture, cc.rect(132 * 3, 132 * 0, 132, 132));
          var frame4 = cc.SpriteFrame.createWithTexture(texture, cc.rect(132 * 0, 132 * 1, 132, 132));
          var frame5 = cc.SpriteFrame.createWithTexture(texture, cc.rect(132 * 1, 132 * 1, 132, 132)); 
          var dragon = cc.Sprite.createWithSpriteFrame(frame0);
          dragon.attr({
            anchorX : 0.5,
            anchorY : 0.5,
            x : 100,
            y : cc.winSize.height-132
          });
          cc.log(dragon.getContentSize());
          this.addChild(dragon); 
          var animFrames = []; 
          animFrames.push(frame0);
          animFrames.push(frame1);
          animFrames.push(frame3);
          animFrames.push(frame4);
          animFrames.push(frame5);
          
          var animation = cc.Animation.create(animFrames, 0.2);
          var animate = cc.Animate.create(animation);
          dragon.runAction(cc.RepeatForever.create(animate));
        }// end onEnter
      });
      // 
      cc.director.runScene(new Scene());
    });
  }
  start();
}

var LeveleArcher = function(){
  function start(){
    // var animFrames_bow = []; 

    cc.LoaderScene.preload([ Res.background ], function () {
      // welcome scene
      var Scene = cc.Scene.extend({
        onEnter:function () {
          this._super();
          var size = cc.director.getWinSize();

          // UI
          var label_token = cc.LabelTTF.create("获取令牌", "Arial", 40);
          label_token.attr({
            x : (cc.winSize.width/2) - 100,
            y : 20
          });
          this.addChild(label_token, 1);
          
          var listener_token = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
              onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                if (cc.rectContainsPoint(rect, locationInNode)){
                  cc.log("hit! x:" + locationInNode.x + " y:" + locationInNode.y);
                  target.opacity = 180;

                  scenes.token = new LeveleToken(); // jump to archer
                  return true; 
                }else{
                  cc.log("not hit!");
                  target.opacity = 255;
                  return true;
                }
                return false;
              },
              onTouchesMoved: function (touches, event) {
                return false;
              },
              onTouchEnded: function (touch, event) {
                return false;
              }
            }
          );
          cc.eventManager.addListener(listener_token, label_token);

          var label_doagain = cc.LabelTTF.create("再来一次", "Arial", 40);
          label_doagain.attr({
            x : (cc.winSize.width/2) + 100,
            y : 20
          });
          this.addChild(label_doagain, 1);
          var listener_doagain = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
              onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                if (cc.rectContainsPoint(rect, locationInNode)){
                  cc.log("hit! x:" + locationInNode.x + " y:" + locationInNode.y);
                  target.opacity = 180;

                  scenes.archer = new LeveleArcher(); // jump to archer
                  return true; 
                }else{
                  cc.log("not hit!");
                  target.opacity = 255;
                  return true;
                }
                return false;
              },
              onTouchesMoved: function (touches, event) {
                return false;
              },
              onTouchEnded: function (touch, event) {
                return false;
              }
            }
          );
          cc.eventManager.addListener(listener_doagain, label_doagain);

          // background
          var background = cc.Sprite.create(Res.background);
          background.attr({
            anchorX : 0.5,
            anchorY : 0.5,
            x : cc.winSize.width/2,
            y : cc.winSize.height/2
          });
          this.addChild(background, 0);

          // Target
          var target_sprite = cc.Sprite.create(Res.target);
          target_sprite.attr({
            anchorX : 0.5,
            anchorY : 0.5,
            x : cc.winSize.width/2,
            y : (cc.winSize.height)-(cc.winSize.height/4)
          });
          target_sprite.setScale(0.01); 

          // target action animations
          var animation_target_default = new cc.Animation();
          var animation_target_hitted = new cc.Animation();

          animation_target_default.addSpriteFrameWithFile ( Res.target ) ;
          animation_target_default.setDelayPerUnit ( 2.8 / 14 ) ; 
          animation_target_default.setRestoreOriginalFrame ( true ) ;

          animation_target_hitted.addSpriteFrameWithFile ( Res.target_hitted ) ;
          animation_target_hitted.setDelayPerUnit ( 2.8 / 14 ) ; 
          animation_target_hitted.setRestoreOriginalFrame ( true ) ;
          
          
          this.addChild(target_sprite, 1);

          var rotate  = cc.RotateBy.create(0.5, 360);
          var scale   = cc.ScaleTo.create(0.5, 1);
          target_sprite.runAction(rotate);
          target_sprite.runAction(scale);

          // Bow
          var sprite_bow = cc.Sprite.create(Res.bow);
          sprite_bow.attr({
            anchorX : 0.5,
            anchorY : 0.5,
            x : cc.winSize.width/2,
            y : cc.winSize.height/4
          });
          this.addChild(sprite_bow, 0);
          // bow action animations
          var animation_bow_default = new cc.Animation();
          var animation_bow_active = new cc.Animation();

          animation_bow_default.addSpriteFrameWithFile ( Res.bow ) ;
          animation_bow_default.setDelayPerUnit ( 2.8 / 14 ) ; 
          animation_bow_default.setRestoreOriginalFrame ( true ) ;

          animation_bow_active.addSpriteFrameWithFile ( Res.onbow ) ;
          animation_bow_active.setDelayPerUnit ( 2.8 / 14 ) ; 
          animation_bow_active.setRestoreOriginalFrame ( true ) ;

          var listener_bow = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
              onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                if (cc.rectContainsPoint(rect, locationInNode)){
                  cc.log("hit! x:" + locationInNode.x + " y:" + locationInNode.y);
                  target.opacity = 180;

                  sprite_bow.stopAllActions();
                  var action = new cc.Animate ( animation_bow_active ) ; 
                  sprite_bow.runAction ( new cc.RepeatForever( action, action.reverse ( ) ) ) ;
                   
                  return true; 
                }else{
                  cc.log("not hit!");
                  target.opacity = 255;
                  return true;
                }
                return false;
              },
              onTouchesMoved: function (touches, event) {
                cc.log('move');
                return false;
              },
              onTouchEnded: function (touch, event) {
                cc.log('release key end');
                // check still in the bow area, if not, ignore this action
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                if (cc.rectContainsPoint(rect, locationInNode)){
                  cc.log("yes leave still hit! x:" + locationInNode.x + " y:" + locationInNode.y);
                  //

                  // some interface , hitted on target
                  var action = new cc.Animate ( animation_target_hitted ) ; 
                  target_sprite.runAction ( new cc.RepeatForever( action, action.reverse ( ) ) ) ;
                  //

                  //
                }else{
                  cc.log("leave will not hit!");
                  target.opacity = 255;
                }

                sprite_bow.stopAllActions();
                var action = new cc.Animate ( animation_bow_default ) ; 
                sprite_bow.runAction ( new cc.RepeatForever( action, action.reverse ( ) ) ) ;
                return true;
              }
            }
          );
          cc.eventManager.addListener(listener_bow, sprite_bow);



        }// end onEnter
      });
      // 
      cc.director.runScene(new Scene());
    });
  }
  start();
}
var LeveleToken= function(){
  function start(){
    cc.LoaderScene.preload([ Res.background ], function () {
      // welcome scene
      var Scene = cc.Scene.extend({
        onEnter:function () {
          this._super();
          var size = cc.director.getWinSize();

          var background = cc.Sprite.create( Res.background );
          background.attr({
            anchorX : 0.5,
            anchorY : 0.5,
            x : cc.winSize.width/2,
            y : cc.winSize.height/2
          });
          this.addChild(background, 0);

          // Phoniex
          var token_sprite = cc.Sprite.create( Res.token );
          token_sprite.attr({
            anchorX : 0.5,
            anchorY : 0.5,
            x : cc.winSize.width/2,
            y : cc.winSize.height/2 
          });
          token_sprite.setScale(0.1);
          var listener_token = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
              onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                if (cc.rectContainsPoint(rect, locationInNode)){
                  cc.log("hit! x:" + locationInNode.x + " y:" + locationInNode.y);
                  target.opacity = 180;
                  return true; 
                }else{
                  cc.log("not hit!");
                  target.opacity = 255;
                  return true;
                }
                return false;
              },
              onTouchesMoved: function (touches, event) {
                return false;
              },
              onTouchEnded: function (touch, event) {
                return false;
              }
            }
          ); 
          cc.eventManager.addListener(listener_token, token_sprite);
          this.addChild(token_sprite, 1);

          var rotate  = cc.RotateBy.create(1, 360);
          var scale   = cc.ScaleTo.create(1.0, 0.3);
          token_sprite.runAction(rotate);
          token_sprite.runAction(scale);


          var ball_green = cc.Sprite.create( Res.ball_green );
          ball_green.attr({
            anchorX : 0.5,
            anchorY : 0.5,
            x : cc.winSize.width/2,
            y : 100
          });
          this.addChild(ball_green, 0);

          var comsume_nums = 2;
          for (var i = 0; i <= 7; i++) {
              var res_type = Res.ball_yellow;
              if (i > comsume_nums){
                res_type = Res.ball_grey;
              }
              var lives_sprite = cc.Sprite.create( res_type );
              var x_pos = i * 70 + 150;
              lives_sprite.attr({
                x : x_pos,
                y : cc.winSize.height - 100
              });
              this.addChild(lives_sprite, 0);
          };
          


        }// end onEnter
      });
      // 
      cc.director.runScene(new Scene());
    });
  }
  start();
}

function onStartScene () {
  scenes.level = new LeveleWelcome; // LeveleWelcome
  // scenes.archer = new LeveleArcher; // LeveleArcher
  // scenes.token = new LeveleToken; // LeveleToken
}


function layers(){
  this.StartUI = function(){}
}

function initMouseEvent (scene) {
  var listener = cc.EventListener.create({
          event: cc.EventListener.MOUSE,
            onMouseMove: function(event){
              var str = "Mouse Move Position X: " + event.getLocationX() + "  Y:" + event.getLocationY();
              // cc.log(str);
            },
            onMouseUp: function(event){
              var str = "Mouse Up detected, Key: " + event.getButton();
              // do something...
              cc.log(str);
            },
            onMouseDown: function(event){
              var str = "Mouse Down detected, Key: " + event.getButton();
              cc.log(str);
              // do something...
            },
            onMouseScroll: function(event){
              var str = "Mouse Scroll detected, X: " + event.getLocationX() + "  Y:" + event.getLocationY();
              // do something...
              cc.log(str);
            }
          });

  cc.eventManager.addListener(listener, scene);
}

function initTouchEvent (scene) {
  var listener = cc.EventListener.create({
      event: cc.EventListener.TOUCH_ALL_AT_ONCE,
        onTouchBegan: function (touch, event) {
          alert("touching");
          return false;
        },
        onTouchesMoved: function (touches, event) {
          cc.log('touch move');
          return false;
        },
        onTouchEnded: function (touch, event) {
          return false;
        }
      });

  cc.eventManager.addListener(listener, scene);
}

function initTouchSprite(scene, gameObj){
  var listener = cc.EventListener.create({
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
        onTouchBegan: function (touch, event) {
          var target = event.getCurrentTarget();
          var locationInNode = target.convertToNodeSpace(touch.getLocation());
          var s = target.getContentSize();
          var rect = cc.rect(0, 0, s.width, s.height);
          if (cc.rectContainsPoint(rect, locationInNode)){
            cc.log("hit! x:" + locationInNode.x + " y:" + locationInNode.y);
            target.opacity = 180;
             
            var hideAction = cc.hide();
            scene.runAction(hideAction);
            return true; 
          }else{
            cc.log("not hit!");
            target.opacity = 255;
            var showAction = cc.show();
            scene.runAction(showAction);
            return true;
          }

          return false;
        },
        onTouchesMoved: function (touches, event) {
          cc.log('touch move');
          // alert("touching"+gameObj);

          return false;
        },
        onTouchEnded: function (touch, event) {
          // alert("touching end"+gameObj);

          return false;
        }
      });

  cc.eventManager.addListener(listener, gameObj);
}


var StartUI = cc.Layer.extend({
  update : function(){
    cc.log('update');
  },
  ctor : function(){
    this._super();

    var monster = new cc.Sprite.create("monster.png");
    monster.attr({
      anchorX : 0.5,
      anchorY : 0.5,
      x : cc.winSize.width/2 + 120,
      y : cc.winSize.height/2
    });

    var dorpAction = cc.MoveTo.create(4, cc.p(monster.y, -30));
    monster.runAction(dorpAction);
    
    this.update();

    this.addChild(monster);

  },
  onEnter : function(){

  }
  
});

function onGameEnter() {
//load resources
cc.LoaderScene.preload(["bg.jpg"], function () {
  var MyScene = cc.Scene.extend({
      onEnter:function () {
          this._super();
          var size = cc.director.getWinSize();

          var background = cc.Sprite.create("bg.jpg");
          background.attr({
            anchorX : 0.5,
            anchorY : 0.5,
            x : cc.winSize.width/2,
            y : cc.winSize.height/2
          });
          this.addChild(background, 0);




          layers.startUI = new StartUI();
          this.addChild(layers.startUI);


          var sprite = cc.Sprite.create("monster.png");
          sprite.setPosition(size.width / 2, size.height / 2);
          // sprite.setScale(0.1);
          this.addChild(sprite, 1);

          var rotate = cc.RotateBy.create(2, 360);
          var scale = cc.ScaleTo.create(1.0, 1.5);

          var seq = cc.sequence;
          // seq.initWithTwoActions(rotate, scale);
          if (seq == null){
            alert('aaa');
          }
          // sprite.runAction(act);


          // sprite.runAction(cc.RepeatForever(rotate));
          // sprite.stopAllActions(); // stop all action

          initTouchSprite(this, sprite);


          var label = cc.LabelTTF.create("Hello Hello", "Arial", 40);
          label.setPosition(size.width / 2, size.height - 20);
          this.addChild(label, 1);
          
          initMouseEvent(this);
          initTouchEvent(this);
 
          return true;
        // this.setKeyboardEnabled(true);
      } 
  });
  // run the scene
  cc.director.runScene(new MyScene());
}, this);




};