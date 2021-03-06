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

		.directive('ariaLabelledby', function() {
			return {
				restrict: 'A',
				require: '^?iaUids',
				link: linkLabelledBy
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
			var original = attrs['id'],
				id = uids.id(original);
			el.attr({
				id: id,
				'role-id': original
			});
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

	function linkLabelledBy(scope, el, attrs, uids) {
		if (uids) {
			el.attr('aria-labelledby', uids.id(attrs['ariaLabelledby']));
		}
	}
})();
