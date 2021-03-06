//! now.js locale configuration
//! locale : Javanese [jv]
//! author : Rony Lantip : https://github.com/lantip
//! reference: http://jv.wikipedia.org/wiki/Basa_Jawa

export default {
  months: 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember'.split('_'),
  monthsShort: 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des'.split('_'),
  weekdays: 'Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu'.split('_'),
  weekdaysShort: 'Min_Sen_Sel_Reb_Kem_Jem_Sep'.split('_'),
  weekdaysMin: 'Mg_Sn_Sl_Rb_Km_Jm_Sp'.split('_'),
  longDateFormat: {
    LT: 'HH.mm',
    LTS: 'HH.mm.ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY [pukul] HH.mm',
    LLLL: 'dddd, D MMMM YYYY [pukul] HH.mm',
  },
  meridiemParse: /enjing|siyang|sonten|ndalu/,
  meridiemHour(hour, meridiem) {
    let h = hour;
    if (h === 12) {
      h = 0;
    }
    if (meridiem === 'enjing') {
      return h;
    } else if (meridiem === 'siyang') {
      return h >= 11 ? h : h + 12;
    } else if (meridiem === 'sonten' || meridiem === 'ndalu') {
      return h + 12;
    }
    return h;
  },
  meridiem(hours) {
    if (hours < 11) {
      return 'enjing';
    } else if (hours < 15) {
      return 'siyang';
    } else if (hours < 19) {
      return 'sonten';
    }
    return 'ndalu';
  },
  calendar: {
    sameDay: '[Dinten puniko pukul] LT',
    nextDay: '[Mbenjang pukul] LT',
    nextWeek: 'dddd [pukul] LT',
    lastDay: '[Kala wingi pukul] LT',
    lastWeek: 'dddd [kepengker pukul] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'wonten ing %s',
    past: '%s ingkang kepengker',
    s: 'sawetawis detik',
    m: 'setunggal menit',
    mm: '%d menit',
    h: 'setunggal jam',
    hh: '%d jam',
    d: 'sedinten',
    dd: '%d dinten',
    M: 'sewulan',
    MM: '%d wulan',
    y: 'setaun',
    yy: '%d taun',
  },
  week: {
    dow: 1, // Monday is the first day of the week.
    doy: 7, // The week that contains Jan 1st is the first week of the year.
  },
};
