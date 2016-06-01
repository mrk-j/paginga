/*!
 * paginga - jQuery Pagination Plugin v0.7
 * https://github.com/mrk-j/paginga
 *
 * Copyright 2015 Mark and other contributors
 * Released under the MIT license
 * https://github.com/mrk-j/paginga/blob/master/LICENSE
 */
;(function ($, window, document, undefined)
{
	"use strict";

		var pluginName = "paginga",
			defaults = {
				itemsPerPage: 3,
				itemsContainer: ".items",
				item: "> div",
				page: 1,
				nextPage: ".nextPage",
				previousPage: ".previousPage", 
				firstPage: ".firstPage",
				lastPage: ".lastPage",
				pageNumbers: ".pageNumbers",
				maxPageNumbers: false,
				currentPageClass: "active",
				pager: ".pager",
				autoHidePager: true,
				scrollToTop: {
					offset: 15,
					speed: 100,
				},
			};

		// The actual plugin constructor
		function paginga(element, options)
		{
			this.element = element;
			this.settings = $.extend( true, {}, defaults, options );
			this._defaults = defaults;
			this._name = pluginName;
			this._ready = false;
			this.currentPage = this.settings.page;
			this.items = $(this.element).find(this.settings.itemsContainer + " " + this.settings.item);
			this.totalPages = Math.ceil(this.items.size() / this.settings.itemsPerPage);

			if(this.totalPages <= 1)
			{
				$(this.element).find(this.settings.pager).hide();
			}
			else
			{
				this.init();
			}
		}

		$.extend(paginga.prototype,
		{
			init: function()
			{
				this.bindEvents();
				this.showPage();
				this._ready = true;
			},
			bindEvents: function()
			{
				var plugin = this,
					element = $(plugin.element),
					previousElement = element.find(plugin.settings.previousPage),
					nextElement = element.find(plugin.settings.nextPage),
					firstElement = element.find(plugin.settings.firstPage),
					lastElement = element.find(plugin.settings.lastPage);

				previousElement.on("click", function()
				{
					plugin.showPreviousPage.call(plugin);
				});

				nextElement.on("click", function()
				{
					plugin.showNextPage.call(plugin);
				});

				firstElement.on("click", function()
				{
					plugin.showFirstPage.call(plugin);
				});

				lastElement.on("click", function()
				{
					plugin.showLastPage.call(plugin);
				});
			},
			showPreviousPage: function()
			{
				this.currentPage--;

				if(this.currentPage <= 1)
				{
					this.currentPage = 1;
				}

				this.showPage();
			},
			showNextPage: function()
			{
				this.currentPage++;

				if(this.currentPage >= this.totalPages)
				{
					this.currentPage = this.totalPages;
				}

				this.showPage();
			},
			showFirstPage: function()
			{
				this.currentPage = 1;

				this.showPage();
			},
			showLastPage: function()
			{
				this.currentPage = this.totalPages;

				this.showPage();
			},
			showPage: function()
			{
				var firstItem = (this.currentPage * this.settings.itemsPerPage) - this.settings.itemsPerPage,
					lastItem = firstItem + this.settings.itemsPerPage;

				$.each(this.items, function(index, item)
				{
					if(index >= firstItem && index < lastItem)
					{
						$(item).show();

						return true;
					}

					$(item).hide();
				});

				var plugin = this,
					element = $(plugin.element),
					previousElement = element.find(plugin.settings.previousPage),
					nextElement = element.find(plugin.settings.nextPage),
					firstElement = element.find(plugin.settings.firstPage),
					lastElement = element.find(plugin.settings.lastPage);

				if(plugin._ready && plugin.settings.scrollToTop && (element.offset().top - plugin.settings.scrollToTop.offset) < $(window).scrollTop())
				{
					$("html, body").animate({ scrollTop: (element.offset().top - plugin.settings.scrollToTop.offset) }, plugin.settings.scrollToTop.speed);
				}

				if(this.currentPage <= 1)
				{
					previousElement.addClass("disabled");
					firstElement.addClass("disabled");
				}
				else
				{
					previousElement.removeClass("disabled");
					firstElement.removeClass("disabled");
				}

				if(this.currentPage >= this.totalPages)
				{
					nextElement.addClass("disabled");
					lastElement.addClass("disabled");
				}
				else
				{
					nextElement.removeClass("disabled");
					lastElement.removeClass("disabled");
				}

				var pager = element.find(this.settings.pager),
					pageNumbers = pager.find(this.settings.pageNumbers);

				if(pageNumbers)
				{
					pageNumbers.html("");

					var firstPage = 1;
					var lastPage = this.totalPages;

					if(this.settings.maxPageNumbers)
					{
						var offset = Math.ceil((this.settings.maxPageNumbers - 1) / 2);

						firstPage = Math.max(1, this.currentPage - offset);
						lastPage = Math.min(this.totalPages, this.currentPage + offset);

						if(lastPage - firstPage < this.settings.maxPageNumbers - 1)
						{
							if(firstPage <= offset)
							{
								lastPage = Math.min(this.totalPages, firstPage + this.settings.maxPageNumbers - 1);
							}
							else if(lastPage > this.totalPages - offset)
							{
								firstPage = Math.max(1, lastPage - this.settings.maxPageNumbers + 1);
							}
						}
					}

					for(var pageNumber = firstPage; pageNumber <= lastPage; pageNumber++)
					{
						var className = pageNumber == this.currentPage ? this.settings.currentPageClass : "";

						pageNumbers.append("<a href='javascript:void(0);' data-page='" + pageNumber + "' class='" + className + "'>" + pageNumber + "</a>");
					}

					pageNumbers.find("a").on("click", function()
					{
						plugin.currentPage = $(this).data("page");

						plugin.showPage.call(plugin);
					});
				}
			}
		});

		$.fn[pluginName] = function(options)
		{
			return this.each(function()
			{
				if(!$.data(this, "plugin_" + pluginName))
				{
					$.data(this, "plugin_" + pluginName, new paginga(this, options));
				}
			});
		};

})(jQuery, window, document);
