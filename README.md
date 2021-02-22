# actions-gundeck

Action for running a rundeck job using gundeck

## usage

```yaml
on: [push]

jobs:
  gundeck:
    runs-on: self-hosted
    steps:
      - uses: tradeshift/actions-gundeck@v1
        with:
          host: https://my-rundeck.com
          ca-cert: ${{ secrets.MTLS_CACERT }}
          client-cert: ${{ secrets.MTLS_CERT }}
          client-key: ${{ secrets.MTLS_KEY }}
          token: ${{ secrets.RUNDECK_TOKEN }}
          project: my-rundeck-project
          job: my-rundeck-job
          options: |
            -my_rundeck_opt some-option-value
            -my_other_rundeck_opt some-option-value
```
