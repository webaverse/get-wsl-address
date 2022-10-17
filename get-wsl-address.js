import child_process from 'child_process';

export const getWslAddress = () => {
  const cp = child_process.spawn('wsl.exe', ['hostname', '-I'], {
    stdio: 'pipe',
    detached: true,
    shell: true,
  });
  let result = '';
  return new Promise((accept, reject) => {
    cp.addListener('exit', code => {
      // console.log('got wsl address', {code});
      if (code !== 0) {
        reject(new Error('wsl exited with non-zero code: ' + code));
      }
    });
    (async () => {
      cp.stdout.setEncoding('utf8');
      for await (const chunk of cp.stdout) {
        result += chunk;
      }
      return result.trim();
    })().then(accept, reject);
  });
};