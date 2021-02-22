import * as core from '@actions/core';
import csvparse from 'csv-parse/lib/sync';

export interface Inputs {
  caCert: string;
  clientCert: string;
  clientKey: string;
  host: string;
  job: string;
  options: string[];
  project: string;
  token: string;
  dockerImage: string;
}

export async function getInputs(): Promise<Inputs> {
  const inputs: Inputs = {
    caCert: core.getInput('ca-cert'),
    clientCert: core.getInput('client-cert'),
    clientKey: core.getInput('client-key'),
    host: core.getInput('host'),
    job: core.getInput('job'),
    options: await getInputList('options'),
    project: core.getInput('project'),
    token: core.getInput('token'),
    dockerImage: core.getInput('docker-image')
  };
  return inputs;
}

async function getInputList(
  name: string,
  ignoreComma = false
): Promise<string[]> {
  const res: string[] = [];

  const items = core.getInput(name);
  if (items === '') {
    return res;
  }

  const parsed: string[][] = await csvparse(items, {
    columns: false,
    relaxColumnCount: true,
    skipLinesWithEmptyValues: true
  });

  for (const output of parsed) {
    if (output.length === 1) {
      res.push(output[0]);
      continue;
    } else if (!ignoreComma) {
      res.push(...output);
      continue;
    }
    res.push(output.join(','));
  }

  return res.filter(item => item).map(pat => pat.trim());
}
