function otpEmailTemplate(Name, otp) {
    return `
     <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html
  dir="ltr"
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  lang="en"
>
  <head>
    <meta charset="UTF-8" />
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta content="telephone=no" name="format-detection" />
    <title>New Message</title>
    <!--[if (mso 16)
      ]><style type="text/css">
        a {
          text-decoration: none;
        }
      </style><!
    [endif]-->
    <!--[if gte mso 9
      ]><style>
        sup {
          font-size: 100% !important;
        }
      </style><!
    [endif]-->
    <!--[if gte mso 9
      ]><xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG></o:AllowPNG> <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    <![endif]-->
    <!--[if !mso]><!-- -->
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
      rel="stylesheet"
    />
    <!--<![endif]-->
    <style type="text/css">
      .rollover:hover .rollover-first {
        max-height: 0px !important;
        display: none !important;
      }
      .rollover:hover .rollover-second {
        max-height: none !important;
        display: block !important;
      }
      .rollover span {
        font-size: 0px;
      }
      u + .body img ~ div div {
        display: none;
      }
      #outlook a {
        padding: 0;
      }
      span.MsoHyperlink,
      span.MsoHyperlinkFollowed {
        color: inherit;
        mso-style-priority: 99;
      }
      a.es-button {
        mso-style-priority: 100 !important;
        text-decoration: none !important;
      }
      a[x-apple-data-detectors],
      #MessageViewBody a {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }
      .es-desk-hidden {
        display: none;
        float: left;
        overflow: hidden;
        width: 0;
        max-height: 0;
        line-height: 0;
        mso-hide: all;
      }
      .es-header-body a:hover {
        color: #ffffff !important;
      }
      .es-content-body a:hover {
        color: #081d36 !important;
      }
      .es-footer-body a:hover {
        color: #081d36 !important;
      }
      .es-infoblock a:hover {
        color: #cccccc !important;
      }
      .es-button-border:hover > a.es-button {
        color: #ffffff !important;
      }
      @media only screen and (max-width: 600px) {
        .es-m-p0r {
          padding-right: 0px !important;
        }
        .es-m-p20r {
          padding-right: 20px !important;
        }
        .es-m-p20l {
          padding-left: 20px !important;
        }
        .es-m-p20b {
          padding-bottom: 20px !important;
        }
        .es-p-default {
        }
        *[class="gmail-fix"] {
          display: none !important;
        }
        p,
        a {
          line-height: 150% !important;
        }
        h1,
        h1 a {
          line-height: 120% !important;
        }
        h2,
        h2 a {
          line-height: 120% !important;
        }
        h3,
        h3 a {
          line-height: 120% !important;
        }
        h4,
        h4 a {
          line-height: 120% !important;
        }
        h5,
        h5 a {
          line-height: 120% !important;
        }
        h6,
        h6 a {
          line-height: 120% !important;
        }
        .es-header-body p {
        }
        .es-content-body p {
        }
        .es-footer-body p {
        }
        .es-infoblock p {
        }
        h1 {
          font-size: 30px !important;
          text-align: center;
        }
        h2 {
          font-size: 24px !important;
          text-align: center;
        }
        h3 {
          font-size: 20px !important;
          text-align: center;
        }
        h4 {
          font-size: 24px !important;
          text-align: left;
        }
        h5 {
          font-size: 20px !important;
          text-align: left;
        }
        h6 {
          font-size: 16px !important;
          text-align: left;
        }
        .es-header-body h1 a,
        .es-content-body h1 a,
        .es-footer-body h1 a {
          font-size: 30px !important;
        }
        .es-header-body h2 a,
        .es-content-body h2 a,
        .es-footer-body h2 a {
          font-size: 24px !important;
        }
        .es-header-body h3 a,
        .es-content-body h3 a,
        .es-footer-body h3 a {
          font-size: 20px !important;
        }
        .es-header-body h4 a,
        .es-content-body h4 a,
        .es-footer-body h4 a {
          font-size: 24px !important;
        }
        .es-header-body h5 a,
        .es-content-body h5 a,
        .es-footer-body h5 a {
          font-size: 20px !important;
        }
        .es-header-body h6 a,
        .es-content-body h6 a,
        .es-footer-body h6 a {
          font-size: 16px !important;
        }
        .es-menu td a {
          font-size: 12px !important;
        }
        .es-header-body p,
        .es-header-body a {
          font-size: 14px !important;
        }
        .es-content-body p,
        .es-content-body a {
          font-size: 14px !important;
        }
        .es-footer-body p,
        .es-footer-body a {
          font-size: 12px !important;
        }
        .es-infoblock p,
        .es-infoblock a {
          font-size: 12px !important;
        }
        .es-m-txt-c,
        .es-m-txt-c h1,
        .es-m-txt-c h2,
        .es-m-txt-c h3,
        .es-m-txt-c h4,
        .es-m-txt-c h5,
        .es-m-txt-c h6 {
          text-align: center !important;
        }
        .es-m-txt-r,
        .es-m-txt-r h1,
        .es-m-txt-r h2,
        .es-m-txt-r h3,
        .es-m-txt-r h4,
        .es-m-txt-r h5,
        .es-m-txt-r h6 {
          text-align: right !important;
        }
        .es-m-txt-j,
        .es-m-txt-j h1,
        .es-m-txt-j h2,
        .es-m-txt-j h3,
        .es-m-txt-j h4,
        .es-m-txt-j h5,
        .es-m-txt-j h6 {
          text-align: justify !important;
        }
        .es-m-txt-l,
        .es-m-txt-l h1,
        .es-m-txt-l h2,
        .es-m-txt-l h3,
        .es-m-txt-l h4,
        .es-m-txt-l h5,
        .es-m-txt-l h6 {
          text-align: left !important;
        }
        .es-m-txt-r img,
        .es-m-txt-c img,
        .es-m-txt-l img {
          display: inline !important;
        }
        .es-m-txt-r .rollover:hover .rollover-second,
        .es-m-txt-c .rollover:hover .rollover-second,
        .es-m-txt-l .rollover:hover .rollover-second {
          display: inline !important;
        }
        .es-m-txt-r .rollover span,
        .es-m-txt-c .rollover span,
        .es-m-txt-l .rollover span {
          line-height: 0 !important;
          font-size: 0 !important;
          display: block;
        }
        .es-spacer {
          display: inline-table;
        }
        a.es-button,
        button.es-button {
          font-size: 18px !important;
          padding: 10px 20px 10px 20px !important;
          line-height: 120% !important;
        }
        a.es-button,
        button.es-button,
        .es-button-border {
          display: inline-block !important;
        }
        .es-m-fw,
        .es-m-fw.es-fw,
        .es-m-fw .es-button {
          display: block !important;
        }
        .es-m-il,
        .es-m-il .es-button,
        .es-social,
        .es-social td,
        .es-menu {
          display: inline-block !important;
        }
        .es-adaptive table,
        .es-left,
        .es-right {
          width: 100% !important;
        }
        .es-content table,
        .es-header table,
        .es-footer table,
        .es-content,
        .es-footer,
        .es-header {
          width: 100% !important;
          max-width: 600px !important;
        }
        .adapt-img {
          width: 100% !important;
          height: auto !important;
        }
        .es-mobile-hidden,
        .es-hidden {
          display: none !important;
        }
        .es-desk-hidden {
          width: auto !important;
          overflow: visible !important;
          float: none !important;
          max-height: inherit !important;
          line-height: inherit !important;
        }
        tr.es-desk-hidden {
          display: table-row !important;
        }
        table.es-desk-hidden {
          display: table !important;
        }
        td.es-desk-menu-hidden {
          display: table-cell !important;
        }
        .es-menu td {
          width: 1% !important;
        }
        table.es-table-not-adapt,
        .esd-block-html table {
          width: auto !important;
        }
        .h-auto {
          height: auto !important;
        }
        .es-text-3313 .es-text-mobile-size-16,
        .es-text-3313 .es-text-mobile-size-16 * {
          font-size: 16px !important;
          line-height: 150% !important;
        }
      }
      @media screen and (max-width: 384px) {
        .mail-message-content {
          width: 414px !important;
        }
      }
    </style>
  </head>
  <body class="body" style="width: 100%; height: 100%; padding: 0; margin: 0">
    <div
      dir="ltr"
      class="es-wrapper-color"
      lang="en"
      style="background-color: #091520"
    >
      <!--[if gte mso 9
        ]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
          <v:fill type="tile" color="#091520"></v:fill> </v:background
      ><![endif]-->
      <table
        width="100%"
        cellspacing="0"
        cellpadding="0"
        class="es-wrapper"
        role="none"
        style="
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          border-collapse: collapse;
          border-spacing: 0px;
          padding: 0;
          margin: 0;
          width: 100%;
          height: 100%;
          background-repeat: repeat;
          background-position: center top;
          background-color: #091520;
        "
      >
        <tr>
          <td valign="top" style="padding: 0; margin: 0">
            <table
              cellpadding="0"
              cellspacing="0"
              align="center"
              class="es-header"
              role="none"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                border-collapse: collapse;
                border-spacing: 0px;
                width: 100%;
                table-layout: fixed !important;
                background-color: transparent;
                background-repeat: repeat;
                background-position: center top;
              "
            >
              <tr>
                <td align="center" style="padding: 0; margin: 0">
                  <table
                    bgcolor="#ffffff"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    class="es-header-body"
                    role="none"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                      background-color: transparent;
                      width: 600px;
                    "
                  >
                    <tr>
                      <td align="left" style="padding: 20px; margin: 0">
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          role="none"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                          "
                        >
                          <tr>
                            <td
                              valign="top"
                              align="center"
                              class="es-m-p0r"
                              style="padding: 0; margin: 0; width: 560px"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                "
                              >
                                <tr>
                                  <td
                                    align="center"
                                    class="es-m-txt-c"
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      font-size: 0px;
                                    "
                                  >
                                    <a
                                      target="_blank"
                                      href="https://viewstripo.email"
                                      style="
                                        mso-line-height-rule: exactly;
                                        text-decoration: underline;
                                        color: #ffffff;
                                        font-size: 12px;
                                      "
                                      ><img
                                        src="https://erixibu.stripocdn.email/content/guids/CABINET_b581c9945fe2e4514a94e313baf823d7/images/group_202.png"
                                        alt="Logo"
                                        title="Logo"
                                        height="40"
                                        style="
                                          display: block;
                                          font-size: 18px;
                                          border: 0;
                                          outline: none;
                                          text-decoration: none;
                                        "
                                        width="106"
                                    /></a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table
              cellpadding="0"
              cellspacing="0"
              align="center"
              class="es-content"
              role="none"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                border-collapse: collapse;
                border-spacing: 0px;
                width: 100%;
                table-layout: fixed !important;
              "
            >
              <tr>
                <td align="center" style="padding: 0; margin: 0">
                  <table
                    bgcolor="#ffffff"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    class="es-content-body"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                      background-color: #ffffff;
                      border-radius: 50px 50px 0 0;
                      width: 600px;
                    "
                    role="none"
                  >
                    <tr>
                      <td align="left" style="padding: 0; margin: 0">
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          role="none"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                          "
                        >
                          <tr>
                            <td
                              align="center"
                              valign="top"
                              style="padding: 0; margin: 0; width: 600px"
                            >
                              <table
                                width="100%"
                                bgcolor="#b2222d"
                                cellpadding="0"
                                cellspacing="0"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: separate;
                                  border-spacing: 0px;
                                  border-radius: 49px 49px 0 0;
                                  background-color: #b2222d;
                                "
                                role="presentation"
                              >
                                <tr>
                                  <td
                                    align="center"
                                    style="padding: 0; margin: 0; font-size: 0"
                                  >
                                    <a
                                      target="_blank"
                                      class="rollover"
                                      href=""
                                      style="
                                        mso-line-height-rule: exactly;
                                        text-decoration: underline;
                                        color: #081d36;
                                        font-size: 18px;
                                      "
                                      ><img
                                        height="152"
                                        src="https://erixibu.stripocdn.email/content/guids/CABINET_c28a4ff9ddd2832cf6d4a0ef46cd1aa3ebf75748820a7063c593995f0c860065/images/emaillogo.png"
                                        alt=""
                                        title=""
                                        class="rollover-first adapt-img"
                                        width="152"
                                        style="
                                          display: block;
                                          font-size: 18px;
                                          border: 0;
                                          outline: none;
                                          text-decoration: none;
                                        "
                                      /><span
                                        style="font-size: 0px; mso-hide: all"
                                        ><img
                                          src="https://erixibu.stripocdn.email/content/guids/CABINET_c28a4ff9ddd2832cf6d4a0ef46cd1aa3ebf75748820a7063c593995f0c860065/images/emaillogo_wzZ.png"
                                          alt=""
                                          height="152"
                                          title=""
                                          class="rollover-second adapt-img"
                                          style="
                                            display: none;
                                            font-size: 18px;
                                            border: 0;
                                            outline: none;
                                            text-decoration: none;
                                            max-height: 0px;
                                          "
                                          width="152"
                                      /></span>
                                    </a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" style="padding: 0; margin: 0">
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          role="none"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                          "
                        >
                          <tr>
                            <td
                              align="center"
                              valign="top"
                              style="padding: 0; margin: 0; width: 600px"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                "
                              >
                                <tr>
                                  <td
                                    align="center"
                                    class="es-m-p20r es-m-p20l"
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      padding-top: 20px;
                                    "
                                  >
                                    <h1
                                      style="
                                        margin: 0;
                                        font-family: Montserrat, helvetica,
                                          arial, sans-serif;
                                        mso-line-height-rule: exactly;
                                        letter-spacing: 0;
                                        font-size: 40px;
                                        font-style: 120%;
                                        font-weight: normal;
                                        line-height: 48px;
                                        color: #081d36;
                                      "
                                    >
                                      <strong
                                        >Brighten up your trading with
                                        Arthlab-algoTest</strong
                                      >
                                    </h1>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    align="center"
                                    class="es-m-p20r es-m-p20l"
                                    style="
                                      margin: 0;
                                      padding-top: 20px;
                                      padding-right: 90px;
                                      padding-bottom: 10px;
                                      padding-left: 90px;
                                      font-family: arial, 'helvetica neue',
                                        helvetica, sans-serif;
                                    "
                                  >
                                    Congratulations on the festive season of
                                    Diwali! To make your celebration even more
                                    special, we're bringing you exclusive deals
                                    on our latest and most popular gadgets
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td
                        align="left"
                        style="
                          margin: 0;
                          padding-top: 30px;
                          padding-right: 20px;
                          padding-bottom: 30px;
                          padding-left: 20px;
                        "
                      >
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          role="none"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                          "
                        >
                          <tr>
                            <td
                              align="center"
                              valign="top"
                              style="padding: 0; margin: 0; width: 560px"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                "
                              >
                                <tr>
                                  <td
                                    align="center"
                                    style="padding: 0; margin: 0"
                                  >
                                    <!--[if mso
                                      ]><a
                                        href="https://bizvaarta.com"
                                        target="_blank"
                                        hidden
                                      >
                                        <v:roundrect
                                          xmlns:v="urn:schemas-microsoft-com:vml"
                                          xmlns:w="urn:schemas-microsoft-com:office:word"
                                          esdevVmlButton
                                          href="https://bizvaarta.com"
                                          style="
                                            height: 51px;
                                            v-text-anchor: middle;
                                            width: 220px;
                                          "
                                          arcsize="0%"
                                          stroke="f"
                                          fillcolor="#b2222d"
                                        >
                                          <w:anchorlock></w:anchorlock>
                                          <center
                                            style="
                                              color: #ffffff;
                                              font-family: arial,
                                                'helvetica neue', helvetica,
                                                sans-serif;
                                              font-size: 18px;
                                              font-weight: 400;
                                              line-height: 18px;
                                              mso-text-raise: 1px;
                                            "
                                          >
                                            Vistit Our website
                                          </center>
                                        </v:roundrect></a
                                      >
                                    <![endif]-->
                                    <!--[if !mso]><!-- --><span
                                      class="es-button-border msohide"
                                      style="
                                        border-style: solid;
                                        border-color: #2cb543;
                                        background: #fb5607;
                                        border-width: 0px;
                                        display: inline-block;
                                        border-radius: 0px;
                                        width: auto;
                                        mso-hide: all;
                                      "
                                      ><a
                                        href="https://bizvaarta.com"
                                        target="_blank"
                                        class="es-button es-button-1665060087841"
                                        style="
                                          mso-style-priority: 100 !important;
                                          text-decoration: none !important;
                                          mso-line-height-rule: exactly;
                                          color: #ffffff;
                                          font-size: 18px;
                                          padding: 15px 40px;
                                          display: inline-block;
                                          background: #b2222d;
                                          border-radius: 0px;
                                          font-family: arial, 'helvetica neue',
                                            helvetica, sans-serif;
                                          font-weight: normal;
                                          font-style: normal;
                                          line-height: 21.6px;
                                          width: auto;
                                          text-align: center;
                                          letter-spacing: 0;
                                          mso-padding-alt: 0;
                                          mso-border-alt: 10px solid #b2222d;
                                        "
                                        >Vistit Our website</a
                                      >
                                    </span>
                                    <!--<![endif]-->
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table
              cellpadding="0"
              cellspacing="0"
              align="center"
              class="es-footer"
              role="none"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                border-collapse: collapse;
                border-spacing: 0px;
                width: 100%;
                table-layout: fixed !important;
                background-color: transparent;
                background-repeat: repeat;
                background-position: center top;
              "
            >
              <tr>
                <td align="center" style="padding: 0; margin: 0">
                  <table
                    bgcolor="#ffffff"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    class="es-footer-body"
                    role="none"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                      background-color: #ffffff;
                      width: 600px;
                    "
                  >
                    <tr>
                      <td
                        align="left"
                        style="
                          margin: 0;
                          padding-top: 20px;
                          padding-bottom: 10px;
                          padding-right: 20px;
                          padding-left: 20px;
                        "
                      >
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          role="none"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                          "
                        >
                          <tr>
                            <td
                              align="center"
                              valign="top"
                              style="padding: 0; margin: 0; width: 560px"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                "
                              >
                                <tr>
                                  <td
                                    align="center"
                                    style="padding: 0; margin: 0"
                                  >
                                    <h1
                                      style="
                                        margin: 0;
                                        font-family: Montserrat, helvetica,
                                          arial, sans-serif;
                                        mso-line-height-rule: exactly;
                                        letter-spacing: 0;
                                        font-size: 40px;
                                        font-style: 120%;
                                        font-weight: normal;
                                        line-height: 48px;
                                        color: #081d36;
                                      "
                                    >
                                      your otp is ${otp}
                                    </h1>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" style="padding: 20px; margin: 0">
                        <!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:200px" valign="top"><![endif]-->
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          align="left"
                          class="es-left"
                          role="none"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                            float: left;
                          "
                        >
                          <tr>
                            <td
                              align="left"
                              class="es-m-p20b"
                              style="padding: 0; margin: 0; width: 160px"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                bgcolor="#ffffff"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: separate;
                                  border-spacing: 0px;
                                  border-radius: 40px;
                                  background-color: #ffffff;
                                "
                                role="presentation"
                              >
                                <tr>
                                  <td
                                    align="center"
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      padding-top: 10px;
                                      font-size: 0px;
                                    "
                                  >
                                    <a
                                      target="_blank"
                                      href="https://viewstripo.email"
                                      style="
                                        mso-line-height-rule: exactly;
                                        text-decoration: underline;
                                        color: #081d36;
                                        font-size: 14px;
                                      "
                                      ><img
                                        src="https://erixibu.stripocdn.email/content/guids/CABINET_b581c9945fe2e4514a94e313baf823d7/images/sticker.png"
                                        alt=""
                                        width="40"
                                        class="b_image"
                                        style="
                                          display: block;
                                          font-size: 18px;
                                          border: 0;
                                          outline: none;
                                          text-decoration: none;
                                        "
                                        height="40"
                                    /></a>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    align="center"
                                    style="
                                      margin: 0;
                                      padding-bottom: 10px;
                                      padding-right: 20px;
                                      padding-left: 20px;
                                      padding-top: 10px;
                                    "
                                  >
                                    <h3
                                      class="b_title"
                                      style="
                                        margin: 0;
                                        font-family: Montserrat, helvetica,
                                          arial, sans-serif;
                                        mso-line-height-rule: exactly;
                                        letter-spacing: 0;
                                        font-size: 20px;
                                        font-style: 120%;
                                        font-weight: normal;
                                        line-height: 24px;
                                        color: #081d36;
                                      "
                                    >
                                      100% safe and secure
                                    </h3>
                                  </td>
                                </tr>
                              </table>
                            </td>
                            <td
                              class="es-hidden"
                              style="padding: 0; margin: 0; width: 40px"
                            ></td>
                          </tr>
                        </table>
                        <!--[if mso]></td><td style="width:160px" valign="top"><![endif]-->
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          align="left"
                          class="es-left"
                          role="none"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                            float: left;
                          "
                        >
                          <tr>
                            <td
                              align="left"
                              class="es-m-p20b"
                              style="padding: 0; margin: 0; width: 160px"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                bgcolor="#ffffff"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: separate;
                                  border-spacing: 0px;
                                  border-radius: 40px;
                                  background-color: #ffffff;
                                "
                                role="presentation"
                              >
                                <tr>
                                  <td
                                    align="center"
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      padding-top: 10px;
                                      font-size: 0px;
                                    "
                                  >
                                    <a
                                      target="_blank"
                                      href="https://viewstripo.email"
                                      style="
                                        mso-line-height-rule: exactly;
                                        text-decoration: underline;
                                        color: #081d36;
                                        font-size: 14px;
                                      "
                                      ><img
                                        src="https://erixibu.stripocdn.email/content/guids/CABINET_b581c9945fe2e4514a94e313baf823d7/images/truck.png"
                                        alt=""
                                        width="40"
                                        class="b_image"
                                        style="
                                          display: block;
                                          font-size: 18px;
                                          border: 0;
                                          outline: none;
                                          text-decoration: none;
                                        "
                                        height="40"
                                    /></a>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    align="center"
                                    class="es-text-3313"
                                    style="
                                      margin: 0;
                                      padding-bottom: 10px;
                                      padding-right: 20px;
                                      padding-left: 20px;
                                      padding-top: 10px;
                                    "
                                  >
                                    <h3
                                      style="
                                        margin: 0;
                                        font-family: Montserrat, helvetica,
                                          arial, sans-serif;
                                        mso-line-height-rule: exactly;
                                        letter-spacing: 0;
                                        font-size: 20px;
                                        font-style: 120%;
                                        font-weight: normal;
                                        line-height: 24px;
                                        color: #081d36;
                                      "
                                    >
                                      get 20 Credits!
                                    </h3>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        <!--[if mso]></td><td style="width:40px"></td><td style="width:160px" valign="top"><![endif]-->
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          align="right"
                          class="es-right"
                          role="none"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                            float: right;
                          "
                        >
                          <tr>
                            <td
                              align="left"
                              style="padding: 0; margin: 0; width: 160px"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                bgcolor="#ffffff"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: separate;
                                  border-spacing: 0px;
                                  border-radius: 40px;
                                  background-color: #ffffff;
                                "
                                role="presentation"
                              >
                                <tr>
                                  <td
                                    align="center"
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      padding-top: 10px;
                                      font-size: 0px;
                                    "
                                  >
                                    <a
                                      target="_blank"
                                      href="https://viewstripo.email"
                                      style="
                                        mso-line-height-rule: exactly;
                                        text-decoration: underline;
                                        color: #081d36;
                                        font-size: 14px;
                                      "
                                      ><img
                                        src="https://erixibu.stripocdn.email/content/guids/CABINET_b581c9945fe2e4514a94e313baf823d7/images/package.png"
                                        alt=""
                                        width="40"
                                        class="b_image"
                                        style="
                                          display: block;
                                          font-size: 18px;
                                          border: 0;
                                          outline: none;
                                          text-decoration: none;
                                        "
                                        height="40"
                                    /></a>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    align="center"
                                    style="
                                      margin: 0;
                                      padding-bottom: 10px;
                                      padding-right: 20px;
                                      padding-left: 20px;
                                      padding-top: 10px;
                                    "
                                  >
                                    <h3
                                      style="
                                        margin: 0;
                                        font-family: Montserrat, helvetica,
                                          arial, sans-serif;
                                        mso-line-height-rule: exactly;
                                        letter-spacing: 0;
                                        font-size: 20px;
                                        font-style: 120%;
                                        font-weight: normal;
                                        line-height: 24px;
                                        color: #081d36;
                                      "
                                    >
                                      Exciting Plans
                                    </h3>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        <!--[if mso]></td></tr></table><![endif]-->
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table
              cellpadding="0"
              cellspacing="0"
              align="center"
              class="es-footer"
              role="none"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                border-collapse: collapse;
                border-spacing: 0px;
                width: 100%;
                table-layout: fixed !important;
                background-color: transparent;
                background-repeat: repeat;
                background-position: center top;
              "
            >
              <tr>
                <td align="center" style="padding: 0; margin: 0">
                  <table
                    bgcolor="#ffffff"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    class="es-footer-body"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                      background-color: #ffffff;
                      border-radius: 0 0 50px 50px;
                      width: 600px;
                    "
                    role="none"
                  >
                    <tr>
                      <td align="left" style="padding: 20px; margin: 0">
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          role="none"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                          "
                        >
                          <tr>
                            <td
                              align="center"
                              valign="top"
                              style="padding: 0; margin: 0; width: 560px"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                "
                              >
                                <tr>
                                  <td
                                    align="center"
                                    style="padding: 0; margin: 0"
                                  >
                                    <p
                                      style="
                                        margin: 0;
                                        mso-line-height-rule: exactly;
                                        font-family: arial, 'helvetica neue',
                                          helvetica, sans-serif;
                                        line-height: 21px;
                                        letter-spacing: 0;
                                        color: #081d36;
                                        font-size: 14px;
                                      "
                                    >
                                      You are receiving this email because you
                                      signed up for Arthlab-algoTest. Cheers!🍷
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    align="center"
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      padding-top: 15px;
                                      padding-bottom: 15px;
                                    "
                                  >
                                    <p
                                      style="
                                        margin: 0;
                                        mso-line-height-rule: exactly;
                                        font-family: arial, 'helvetica neue',
                                          helvetica, sans-serif;
                                        line-height: 21px;
                                        letter-spacing: 0;
                                        color: #081d36;
                                        font-size: 14px;
                                      "
                                    >
                                      Registered office : 7, Rushikesh building,
                                      Sawarkar chowk, Aurangabad 431005
                                    </p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table
              cellpadding="0"
              cellspacing="0"
              align="center"
              class="es-content"
              role="none"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                border-collapse: collapse;
                border-spacing: 0px;
                width: 100%;
                table-layout: fixed !important;
              "
            >
              <tr>
                <td
                  align="center"
                  class="es-info-area"
                  style="padding: 0; margin: 0"
                >
                  <table
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    bgcolor="#ffffff"
                    class="es-content-body"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                      background-color: transparent;
                      width: 600px;
                    "
                    role="none"
                  >
                    <tr>
                      <td
                        align="left"
                        style="
                          margin: 0;
                          padding-top: 30px;
                          padding-right: 20px;
                          padding-bottom: 30px;
                          padding-left: 20px;
                        "
                      >
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          role="none"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                          "
                        >
                          <tr>
                            <td
                              align="left"
                              style="padding: 0; margin: 0; width: 560px"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                "
                              >
                                <tr>
                                  <td
                                    align="center"
                                    class="es-infoblock made_with"
                                    style="padding: 0; margin: 0; font-size: 0"
                                  >
                                    <a
                                      target="_blank"
                                      href="https://viewstripo.email/?utm_source=templates&utm_medium=email&utm_campaign=gadgets_11&utm_content=festival_of_lights"
                                      style="
                                        mso-line-height-rule: exactly;
                                        text-decoration: underline;
                                        color: #cccccc;
                                        font-size: 12px;
                                      "
                                      ><img
                                        src="https://erixibu.stripocdn.email/content/guids/CABINET_c28a4ff9ddd2832cf6d4a0ef46cd1aa3ebf75748820a7063c593995f0c860065/images/emaillogo.png"
                                        alt=""
                                        width="152"
                                        style="
                                          display: block;
                                          font-size: 18px;
                                          border: 0;
                                          outline: none;
                                          text-decoration: none;
                                        "
                                        height="152"
                                    /></a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>

    `;
}
module.exports=otpEmailTemplate;