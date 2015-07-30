'use strict';

(function() {
	angular.module('ia.uniqueIds', [])

		.directive('iaUids', function() {
			return {
				scope: {},
				controller: uidsCtrl,
				link: {
					pre: prelinkUids
				}
			};
		})

		.directive('id', function() {
			return {
				restrict: 'A',
				require: '^?iaUids',
				link: linkId
			};
		})

		.directive('for', function() {
			return {
				restrict: 'A',
				require: '^?iaUids',
				link: linkFor
			};
		})

		.directive('ariaDescribedby', function() {
			return {
				restrict: 'A',
				require: '^?iaUids',
				link: linkDescribedBy
			};
		})
	;

	var next = 1;

	function prelinkUids(scope, el, attrs, ctrl) {
		if (attrs.iaUids) {
			ctrl.prefix = attrs.iaUids + '-';
		}
	}

	function uidsCtrl() {
		var me = this,
			map = {};

		if (!me.prefix) {
			me.prefix = '';
		}

		me.id = function(v) {
			var id = map[v];
			if (id == null) {
				id = map[v] = me.prefix + v + '-' + (++next);
			}
			return id;
		};
	}

	function linkId(scope, el, attrs, uids) {
		if (uids) {
			el.attr('id', uids.id(attrs['id']));
		}
	}

	function linkFor(scope, el, attrs, uids) {
		if (uids) {
			el.attr('for', uids.id(attrs['for']));
		}
	}

	function linkDescribedBy(scope, el, attrs, uids) {
		if (uids) {
			el.attr('aria-describedby', uids.id(attrs['ariaDescribedby']));
		}
	}
})();
