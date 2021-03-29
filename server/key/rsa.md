# Key RSA

``` shell
$ ssh-keygen -t rsa -b 4096 -m PEM -f key
# not enter a passphrase
$ ssh-keygen -e -m PEM -f key > key.pub
```

