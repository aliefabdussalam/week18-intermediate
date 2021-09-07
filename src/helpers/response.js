const response = {
  success: (res, data, code, message) => {
    const resp = {
      success: true,
      data,
      code,
      message,
    };
    res.json(resp);
  },
  sucLog: (res, data, token, code, message) => {
    const resp = {
      success: true,
      data,
      code,
      message,
      token,
    };
    res.json(resp);
  },
  errLogin: (res, message) => {
    const r = {
      message,
    };
    res.json(r);
  },
  failed: (res, code, err) => {
    if (code === 400) {
      const respon = {
        success: false,
        data: null,
        code,
        error: err,
        message: 'Error on client side (input false)',
      };
      res.json(respon);
    } else if (code === 404) {
      const respons = {
        success: false,
        data: null,
        code,
        error: err,
        message: 'Data not found',
      };
      res.json(respons);
    } else if (code === 502) {
      const re = {
        success: false,
        data: null,
        code,
        error: err,
        message: 'Invalid response from another request',
      };
      res.json(re);
    }
  },
};

module.exports = response;
