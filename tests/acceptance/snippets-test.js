import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import ENV from 'dummy/config/environment';

moduleForAcceptance('Acceptance | snippets');

test('it includes the body snippet in lib/snippets', function(assert) {
  console.log(ENV.environment);
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal($('h1:contains("Snippets Rule!")').length, 1,
      'The body snippet was included');
  });
});

test('it includes the head snippet in lib/snippets', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal($('meta[name="user-login"][content="sohara"]').length, 1,
      'The head snippet was included');
  });
});

test('it includes an environment-specific snippet in lib/snippets/test', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal($('body h3:contains("Footer, yo!")').length, 1,
      'The body-footer snippet was included');
  });
});


