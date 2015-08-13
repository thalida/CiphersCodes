'use strict';

app.service('cipherUtils', [
	function(){
		var _alpha = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
		var _alphanumeric = _alpha.concat(['0','1','2','3','4','5','6','7','8','9']);
		var _alphagrid = (function(){
			var alphagrid = new Array(6);
			var index = 0;

			for( var i = 1; i <= 6; i += 1 ){
				alphagrid[i] = new Array(6);
				for( var j = 1; j <= 6; j += 1 ){
					alphagrid[i][j] = _alphanumeric[index];
					index += 1;
				}
			}

			return alphagrid;
		})();

		var utils = {};

		utils.ALPHA = function(){
			return angular.copy( _alpha );
		};

		utils.ALPHAGRID = function(){
			return angular.copy(_alphagrid);
		};

		utils.ALPHANUMERIC = function(){
			return angular.copy( _alphanumeric );
		};

		utils.TOTAL_ALPHA = (function(){
			return _alpha.length;
		})();


		utils.setCase = function(char, makeUpperCase){
			return (makeUpperCase === true) ? char.toUpperCase() : char;
		};

		utils.eachCharacter = function( string, increment, cb ){
			if( typeof increment === 'function' ){
				cb = increment;
				increment = 1;
			}

			for( var i = 0; i < string.length; i += increment ){
				var c = string.charAt(i);
				var isUpper = (c.match(/^[A-Z]$/)) ? true : false;

				if( typeof cb === 'function' ){
					cb(i, c, isUpper);
				}
			}
		};

		utils.extendCopy = function(obj1, obj2){
			return angular.extend({}, obj1, obj2);
		};

		utils.find = function( item, array ){
			for(var i = 0; i < array.length; i += 1){
				for(var j = 0; j < array.length; j += 1){
					if(item == array[i][j]){
						return { x: i, y: j };
					}
				}
			}
			return false;
		};

		utils.isLetter = function( str ){
			return str.match(/^[A-Za-z]$/);
		};

		utils.makeKeyedAlpha = function( key ){
			var alpha = utils.ALPHA();
			var keyedAlpha = (key !== '' && key !== null) ? key.split('') : [];

			$.each(keyedAlpha, function(index, letter){
				var n = alpha.indexOf( letter.toLowerCase() );
				alpha.splice(n,1);
			});

			keyedAlpha = keyedAlpha.concat(alpha);

			return keyedAlpha;
		};

		utils.mod = function(a, b){
			return ((a % b) + b) % b;
		};

		return utils;
	}
]);
