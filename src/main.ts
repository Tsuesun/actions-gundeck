import {setFailed} from '@actions/core';
import {getInputs} from './inputs';
import * as gundeck from './gundeck';

async function run(): Promise<void> {
  try {
    const inputs = await getInputs();
    await gundeck.run(inputs);
  } catch (error) {
    setFailed(error.message);
  }
}

run();
