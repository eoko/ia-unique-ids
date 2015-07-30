describe('ia unique ids', function() {
	var $compile,
		$rootScope;

	beforeEach(module('ia.uniqueIds'));

	beforeEach(inject(function(_$compile_, _$rootScope_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));

	it('replaces ids wrapped in an uid group', function() {
		var element = $compile(
			[
				'<div id="test">',
					'<div ia-uids="prefix">',
						'<span test1 id="foo"></span>',
						'<span test2 id="bar"></span>',
					'</div>',
				'</div>'
			].join('')
		)($rootScope);

		$rootScope.$digest();

		expect(element.find('[test1]').attr('id'))
			.not.toEqual('foo');

		expect(element.find('[test2]').attr('id'))
			.not.toEqual('foo');
	});

	it('replaces ids with globally unique ones', function() {
		var element = $compile(
			[
				'<div ia-uids="prefix">',
					'<span test1 id="foo"></span>',
					'<span test2 id="bar"></span>',
				'</div>',
				'<div ia-uids="prefix">',
					'<span test2-1 id="foo"></span>',
					'<span test2-2 id="bar"></span>',
				'</div>'
			].join('')
		)($rootScope);

		var element2 = $compile(
			[
				'<div id="test">',
					'<div ia-uids="prefix">',
						'<span test1 id="foo"></span>',
						'<span test2 id="bar"></span>',
					'</div>',
				'</div>'
			].join('')
		)($rootScope);

		$rootScope.$digest();

		var foo = element.find('[test1]').attr('id'),
			bar = element.find('[test2]').attr('id'),
			foo2 = element2.find('[test1]').attr('id'),
			bar2 = element2.find('[test2]').attr('id');

		expect(foo).not.toEqual('foo');
		expect(bar).not.toEqual('foo');

		expect(element.find('[test2-1]').attr('id'))
			.not.toEqual(foo);
		expect(element.find('[test2-2]').attr('id'))
			.not.toEqual(bar);

		expect(foo2).not.toEqual('foo');
		expect(bar2).not.toEqual('bar');

		expect(foo).not.toEqual(foo2);
		expect(bar).not.toEqual(bar2);
	});

	it('does not replace ids outside of a uids group', function() {
		var element = $compile(
			[
				'<div test id="test">',
					'<div ia-uids="prefix">',
						'<span test1 id="foo"></span>',
						'<span test2 id="bar"></span>',
					'</div>',
				'</div>'
			].join('')
		)($rootScope);

		$rootScope.$digest();

		expect(element.attr('id')).toEqual('test');
	});

	it('replaces for value with matching ids', function() {
		var element = $compile(
			[
				'<div id="test">',
					'<div ia-uids="prefix">',
						'<span test1 id="foo"></span>',
						'<span test2 id="bar"></span>',
						'<label test1label for="foo"></label>',
						'<label test2label for="bar"></label>',
					'</div>',
					'<div ia-uids="prefix">',
						'<span test2-1 id="foo"></span>',
						'<span test2-2 id="bar"></span>',
						'<label test2-1label for="foo"></label>',
						'<label test2-2label for="bar"></label>',
					'</div>',
				'</div>'
			].join('')
		)($rootScope);

		$rootScope.$digest();

		expect(element.find('[test1]').attr('id'))
			.toEqual(element.find('[test1label]').attr('for'));
		expect(element.find('[test2]').attr('id'))
			.toEqual(element.find('[test2label]').attr('for'));

		expect(element.find('[test2-1]').attr('id'))
			.toEqual(element.find('[test2-1label]').attr('for'));
		expect(element.find('[test2-2]').attr('id'))
			.toEqual(element.find('[test2-2label]').attr('for'));
	});

	it('replaces aria-describedby value with matching ids', function() {
		var element = $compile(
			[
				'<div>',
					'<div ia-uids>',
						'<span test1 id="foo"></span>',
						'<span test2 id="bar"></span>',
						'<label test1label aria-describedby="foo"></label>',
						'<label test2label aria-describedby="bar"></label>',
					'</div>',
					'<div ia-uids>',
						'<span test2-1 id="foo"></span>',
						'<span test2-2 id="bar"></span>',
						'<label test2-1label aria-describedby="foo"></label>',
						'<label test2-2label aria-describedby="bar"></label>',
					'</div>',
				'</div>'
			].join('')
		)($rootScope);

		$rootScope.$digest();

		expect(element.find('[test1]').attr('id'))
			.toEqual(element.find('[test1label]').attr('aria-describedby'));
		expect(element.find('[test2]').attr('id'))
			.toEqual(element.find('[test2label]').attr('aria-describedby'));

		expect(element.find('[test2-1]').attr('id'))
			.toEqual(element.find('[test2-1label]').attr('aria-describedby'));
		expect(element.find('[test2-2]').attr('id'))
			.toEqual(element.find('[test2-2label]').attr('aria-describedby'));
	});

	it('can use an optionnal prefix', function() {
		var element = $compile(
			[
				'<div>',
					'<div ia-uids="prefix">',
						'<span test1 id="foo"></span>',
						'<span test2 id="bar"></span>',
					'</div>',
					'<div ia-uids>',
						'<span test2-1 id="foo"></span>',
						'<span test2-2 id="bar"></span>',
					'</div>',
				'</div>'
			].join('')
		)($rootScope);

		$rootScope.$digest();

		expect(element.find('[test1]').attr('id').substr(0, 7))
			.toEqual('prefix-');
		expect(element.find('[test2]').attr('id').substr(0, 7))
			.toEqual('prefix-');

		expect(element.find('[test2-1]').attr('id').substr(0,4))
			.toEqual('foo-');
		expect(element.find('[test2-2]').attr('id').substr(0,4))
			.toEqual('bar-');
	});
});
