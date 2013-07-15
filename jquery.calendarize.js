(function($) {

	function tableCalendar(element, params) {

		var options = {
			month: new Date().getMonth(),
			year: new Date().getFullYear(),
		}

		  , months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
		  , days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

		$.extend(options, params)

		function createEmptyTable() {
			return $('<table/>', { 'class': 'table table-bordered'})
					.append($('<thead/>').append('<tr/>')).append('<tbody/>')
		}

		function createTableHeaders(onTable) {
			$.each(days, function(i, el) {
				onTable.find('thead tr').append($('<th/>', {'html': el}))
			})
		}

		function createDays(onTable) {
			var tbody = onTable.find('tbody')
			for(var i = 0; i < 6; i++) {
				var tr = $('<tr/>').appendTo(tbody)
				$.each(days, function() {
					tr.append('<td/>')
				})
			}
			addDays(onTable)
		}

		// generates the number of the days on the calendar
		// shows the days for the previous months if necessary
		function dayNumbers(onTable) {
			var tds = onTable.find('td')
			  , firstIndex = getIndexOfFirstDay(options.month, options.year)

			  , daysCurrentMonth = getDaysInMonth(options.month, options.year)
			  , previousDate = getPreviousDate(options.month, options.year)
			  , daysPreviousMonth = getDaysInMonth(previousDate.getMonth(), previousDate.getFullYear())
			  , daysPreviousStart = daysPreviousMonth - (firstIndex - 1)
			  , daysNextToShow = tds.length - daysCurrentMonth - firstIndex

			  , daysDisplayed = []
			
			for(var i = daysPreviousStart; i <= daysPreviousMonth; ++i)
				daysDisplayed.push(i)

			for(var i = 1; i <= daysCurrentMonth; ++i)
				daysDisplayed.push(i)

			for(var i = 1; i <= daysNextToShow; ++i)
				daysDisplayed.push(i)

			return daysDisplayed
		}

		// adds the number of the day to the calendar
		function addDays(onTable) {
			var tds = onTable.find('td')
			  , dayNums = dayNumbers(onTable)
			  , insideCurrentMonth = false
			  , tdClass = options.otherMonthClass
			$.each(tds, function(i, el) {
				var date = days[i]

				if(date == 1)
					insideCurrentMonth = !insideCurrentMonth

				$(el).html(dayNums[i])
			})
		}

		function getDaysInMonth(month, year) {
			// adding 1 because the month will be wrong otherwise
			return new Date(year, month + 1, 0).getDate()
		}

		function getIndexOfFirstDay(month, year) {
			return new Date(year, month, 1).getDay()
		}

		function getPreviousDate(month, year) {
			if(month == 0)
				return new Date(year - 1, 12, 0)
			return new Date(year, month - 1, 1)
		}

		function getNextDate(month, year) {
			if(month == 11)
				return new Date(year + 1, 1, 0)
			return new Date(year, month + 1, 0)
		}

		// takin' care of business
		var table = createEmptyTable()
		createTableHeaders(table)
		createDays(table)

		var monthYear = $('<h3/>', {
			'html': months[options.month] + ' ' + options.year
		})
		monthYear.appendTo(element)
		table.appendTo(element)
	}


	$.fn.calendarize = function(params) {
		tableCalendar(this, params)
		return this
	}
})(jQuery)
