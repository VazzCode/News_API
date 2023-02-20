var client = http.Client();
    try {
      var uri = Uri.http(
        "10.0.2.2:8000",
        "/data",
      );
      var request = await client.get(uri).then((value) {
        print('body ' + value.body.runtimeType.toString());
        setState(() => json = jsonDecode(value.body));
      }).onError((error, stackTrace) {
        print(error.toString());
      });
    } finally {
      client.close();
    }

    [
    _SalesData('Jan', 35),
    _SalesData('Feb', 28),
    _SalesData('Mar', 34),
    _SalesData('Apr', 32),
    _SalesData('May', 40)
  ];