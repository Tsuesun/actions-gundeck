import {Inputs} from './inputs';
import {exec} from '@tradeshift/actions-exec';

export async function run(inputs: Inputs): Promise<void> {
  const res = await exec(
    'docker',
    [
      'run',
      '--rm',
      '-e',
      `HOST=${inputs.host}`,
      '-e',
      `CA=${inputs.caCert}`,
      '-e',
      `CERT=${inputs.clientCert}`,
      '-e',
      `KEY=${inputs.clientKey}`,
      '-e',
      `JOB=${inputs.job}`,
      '-e',
      `PROJECT=${inputs.project}`,
      '-e',
      `TOKEN=${inputs.token}`,
      '-e',
      `OPTIONS=${inputs.options.join(' ')}`,
      inputs.dockerImage
    ],
    false
  );

  if (res.stderr !== '' && !res.success) {
    throw new Error(`Error running gundeck: ${res.stderr}`);
  }
}
