//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        year:null,
        month:null,
        day:null,
        week:null,
        selectData:[],
        selectDay:null,
        huangli:null
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    getHuangli:function(d){
        let that = this
        let date = new Date(d.replace(/-/g, "/"))
        let year = date.getFullYear()
        let month = date.getMonth()+1
        let day = date.getDate()
        let storeName = year + '-' + month + '-' + day
        console.log("时间》》》》》》》》》》》",storeName)
      
        if (!wx.getStorageSync(storeName)){
            wx.request({
                url: 'https://www.d1xz.net/rili/huangli.aspx?y=' + year + '&m=' + month + '&d=' + day + '&type=json',
                method: "GET",
                success: function (res) {
                    //console.log(res.data.huangli)
                    wx.setStorageSync(storeName, res.data.huangli)
                    that.setData({
                        huangli: res.data.huangli
                    })
                }
            })
        }else{
            that.setData({
                huangli: wx.getStorageSync(storeName)
            })
        }
        
        
    },
    onLoad: function () {
        this.getDate()
        this.calendar()
        this.getHuangli("2018-03-29")
    },
    getDate:function(){
        let date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()
        const week = date.getDay()

        this.setData({
            year: year,
            month: month,
            day: day,
            week:week,
            selectDay: year + '-' + month
        })

    },

    bindDateChange:function(e){
        let that = this
        let selDate = e.detail.value
        let dateArray = selDate.split("-")
        that.setData({
            selectDay: e.detail.value,
            year: dateArray[0],
            month: dateArray[1]
        })
        //that.getCalendar(new Date(e.detail.value))
    },

    getDays:function(e){
        console.log(e)
        let that = this
        that.setData({
            day:e.target.id
        })
        let date = that.data.year + '-' + that.data.month + '-' + e.target.id
        
        that.getHuangli(date)
    },
    calendar:function(){
        let that = this
        let date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth()
        const day = date.getDate()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()
        const week = date.getDay()

        this.setData({
            year: year,
            month: month + 1,
            day: day,
            week: week
        })

        that.getCalendar(new Date())
        
    },
    getCalendar:function(date) {
        let that = this
        let year = date.getFullYear()
       // if (year < 100) year = "19" + year
        let month = date.getMonth()
        let weeks = ['日', '一', '二', '三', '四', '五', '六']
        let dayStr = {}
        function daysInMonth(month, year) {
            return new Date(year, month + 1, 0).getDate()
        }
        //每个月的第一天
        let firstDay = new Date(year, month, 1)
        let dayInMonth = daysInMonth(month, year)
        // 每个月的最后一天
        let lastDay = new Date(year, month, dayInMonth)
        // 第一天星期几(0-6)
        let weekday = firstDay.getDay()
        // 最后一天星期几
        let lastDayWeekDay = lastDay.getDay()
        // 每一个都是从1号开始
        let days = 1
        // 补齐前面的空格
        // for (let i = 0; i < weekday; i++) {
        //     dayStr.push('-')
        // }

        /*农历部分*/
        var CalendarData = new Array(100);
        var madd = new Array(12);
        var tgString = "甲乙丙丁戊己庚辛壬癸";
        var dzString = "子丑寅卯辰巳午未申酉戌亥";
        var numString = "一二三四五六七八九十";
        var monString = "正二三四五六七八九十冬腊";
        var weekString = "日一二三四五六";
        var sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
        var solarTerm = new Array("小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至");
        var sTermInfo = new Array(0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758);
        
        CalendarData = new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95);
        madd[0] = 0;
        madd[1] = 31;
        madd[2] = 59;
        madd[3] = 90;
        madd[4] = 120;
        madd[5] = 151;
        madd[6] = 181;
        madd[7] = 212;
        madd[8] = 243;
        madd[9] = 273;
        madd[10] = 304;
        madd[11] = 334;
        function GetBit(m, n) {
            return (m >> n) & 1;
        }


        ///////////
        for (; days <= dayInMonth; days++) {
            dayStr[days] = {}
            let callDay = dayStr[days]
            callDay.day= days
            callDay.year = year
            callDay.month = month+1
            let sy = e2c(year, month, days)
            // console.log(sy)
            callDay.lnyear = sy.cyear
            callDay.lnsx = sy.sx
            callDay.lnmonth = sy.month
            callDay.lnday = sy.day
            console.log()

            function jq(y, m) {
                //节气
                let tmp1 = sTerm(y, m * 2) - 1
                let tmp2 = sTerm(y, m * 2 + 1) - 1
                console.log(tmp1 + "####" + tmp2)
                return solarTerm[m * 2] + "****" + solarTerm[m * 2 + 1]
            }

            if (days == sTerm(year, month * 2) - 1){
                callDay.jq = solarTerm[month * 2]
            } else if (days == sTerm(year, month * 2 + 1) - 1){
                callDay.jq = solarTerm[month * 2 + 1]
            }else{
                callDay.jq = ''
            }

            weekday++
            if (weekday % 7 == 0) {
                weekday = 0
            }
        }
        // 补齐后面的空格
        // for (let j = 0; j < (7 - lastDayWeekDay - 1); j++) {
        //     dayStr[days].day='-'
        // }
        function e2c() {
            var cYear, cMonth, cDay, TheDate
           // console.log("222")
            TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2])
            let total, m, n, k
            console.log(TheDate)
            let isEnd = false
            let tmp = TheDate.getYear()
            if (tmp < 1900) {
                tmp += 1900
            }
           // console.log(TheDate.getMonth())
            total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;
            if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {
                total++;
            }
            for (m = 0; ; m++) {
                k = (CalendarData[m] < 0xfff) ? 11 : 12;
                for (n = k; n >= 0; n--) {
                    if (total <= 29 + GetBit(CalendarData[m], n)) {
                        isEnd = true; 
                        break;
                    }
                    total = total - 29 - GetBit(CalendarData[m], n);
                }
                if (isEnd) break
            }
            cYear = 1921 + m
            cMonth = k - n + 1
            cDay = total
            if (k == 12) {
                if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {
                    cMonth = 1 - cMonth;
                }
                if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
                    cMonth--;
                }
            }
            function years(){
                let tmp = tgString.charAt((cYear - 4) % 10)
                tmp += dzString.charAt((cYear - 4) % 12)
                return tmp
            }
            function days() {
                let tmp = (cDay < 11) ? "初" : ((cDay < 20) ? "十" : ((cDay < 30) ? "廿" : "三十"))
                if (cDay % 10 != 0 || cDay == 10) {
                    tmp += numString.charAt((cDay - 1) % 10)
                }
                return tmp
            }
            function months() {
                let tmp = ""
                if (cMonth < 1) {
                    tmp += "(闰)"
                    tmp += monString.charAt(-cMonth - 1)
                } else {
                    tmp += monString.charAt(cMonth - 1)
                }
                return tmp
            }
            

            return{
                cyear: years(),
                sx: sx.charAt((cYear - 4) % 12),
                month: months(),
                day: days(),
            }
           
        }

        //返回某年的第n个节气为几日(从0小寒起算)
        function sTerm(y, n) {
            var offDate = new Date((31556925974.7 * (y - 1900) + sTermInfo[n] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
            return (offDate.getUTCDate())
        }

        let ln = {
            year: function () {
                let tmp = tgString.charAt((cYear - 4) % 10)
                tmp += dzString.charAt((cYear - 4) % 12)
                return tmp
            },
            sx: function () {
                return sx.charAt((cYear - 4) % 12)
            },
            month: function () {
                let tmp = ""
                if (cMonth < 1) {
                    tmp += "(闰)"
                    tmp += monString.charAt(-cMonth - 1)
                } else {
                    tmp += monString.charAt(cMonth - 1)
                }
                return tmp
            },
            day: function () {
                let tmp = ""
                tmp += (cDay < 11) ? "初" : ((cDay < 20) ? "十" : ((cDay < 30) ? "廿" : "三十"))
                if (cDay % 10 != 0 || cDay == 10) {
                    tmp += numString.charAt((cDay - 1) % 10)
                }
                return tmp
            },
            jq: function (y, m) {
                //节气
                let tmp1 = sTerm(y, m * 2) - 1
                let tmp2 = sTerm(y, m * 2 + 1) - 1
                console.log(tmp1 + "####" + tmp2)
                return solarTerm[m * 2] + "****" + solarTerm[m * 2 + 1]
            }
        }

        // function GetLunarDay(solarYear, solarMonth, solarDay) {
        //     //solarYear = solarYear<1900?(1900+solarYear):solarYear
        //     // if (solarYear < 1921 || solarYear > 2020) {
        //     //     return "";
        //     // } else {
        //         solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
        //         e2c(solarYear, solarMonth, solarDay)
        //         //console.log(ln.year())
        //         let s = {
        //             cyear: ln.year(),
        //             sx: ln.sx(),
        //             cmonth: ln.month(),
        //             cday: ln.day()
        //         }
        //         return s
        //         //console.log(ln.jq(solarYear, solarMonth))
        //         //return GetcDateString()
        //     //}
        // }


        var D = new Date();
        var yy = D.getFullYear();
        var mm = D.getMonth() + 1;
        var dd = D.getDate();
        var ww = D.getDay();
        var ss = parseInt(D.getTime() / 1000);
        if (yy < 100) yy = "19" + yy;
        
        /*end 农历*/

        console.log("days:", dayStr)
        console.log(e2c("2018", "3", "30"))

        that.setData({
            calendarDay: dayStr,
            weeks: weeks
        })
    },
    getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    getFr:function(){
        // let today = new Date()
        // let calendar = new Date();
        // let month = calendar.getMonth();
        // let date = calendar.getDate();
        // if ((month == 0) && (date == 1)) document.write("元旦");
        // if ((month == 2) && (date == 12)) document.write("植树节");
        // if ((month == 3) && (date == 5)) document.write("清明节");
        // if ((month == 4) && (date == 1)) document.write("国际劳动节");
        // if ((month == 4) && (date == 4)) document.write("青年节");
        // if ((month == 5) && (date == 1)) document.write("国际儿童节");
        // if ((month == 7) && (date == 1)) document.write("建军节");
        // if ((month == 7) && (date == 16)) document.write("七夕情人节");
        // if ((month == 9) && (date == 1)) document.write("国庆节/国际音乐节/国际老人节");
        // if ((month == 11) && (date == 24)) document.write("平安夜");
        // if ((month == 11) && (date == 25)) document.write("圣诞节");
        
    }
})
