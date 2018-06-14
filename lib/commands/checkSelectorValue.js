const checkCmd = require('../utils/checkCommand');
const findOne = require('../page/findOne');

/**
 * @param {!RemoteBrowser=} context
 * @param {string|{type: string, path: string}} selector
 * @param {*} value
 * @returns {Promise<void>}
 */
module.exports = async function checkSelectorValue(context, selector, value) {
  checkCmd(context, 'checkSelectorValue', selector, value);

  const el = await findOne(context.page, selector);
  const res = el ?
    (await context.page.evaluate(e => e.value, el)) : undefined;

  if (res !== value) {
    throw new Error(`Expected value of '${selector}' to be '${value}', but it was '${res}'`);
  }
};