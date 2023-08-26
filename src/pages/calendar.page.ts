import BasePageObject from "./base.page.js";
import openWebsite from "../support/lib/openWebsite.js";
import {browser} from "@wdio/globals";
import {dateHelper} from "../helpers/DateHelper.js";
import {Color} from "../models/Color";

class CalendarPageObject extends BasePageObject {
    // Page elements
    protected _pageId = $('h1=Catendar');
    private mothYear = (moth: string) => {
        return $(`h2=${moth}`)
    }
    private _headerContent = $('[class*="px-4 py-2"]');
    private sideBarContent = $('[class*="mt-9"]');
    private gridContent = $('[class*="flex-1 grid grid-cols-7 grid-rows-5"]');
    private daysDisplayed = () => {
        return this.gridContent.$$('[class*="text-sm p-1 my-1"]');
    }

    private _gridDay = (day: string) => {
        return $(`p*=${day}`).$('..').$('..');
    }

    private async _getDayElement(day: string) {
        const elements = await $$(`p*=${day}`)
        if(elements.length> 1 && Number(day) > 22){
            return elements[1].$('..').$('..');
        }else{
            return elements[0].$('..').$('..');
        }
    }

    private _appointmentsOnDate = async (day: string) => {
        const parent = await this._getDayElement(day);
        return parent.$$('[class*="mr-3"]')
    }

    private _elementParentDay = (day: string) => {
        return $(`p*=${day}`).$('..').$('..');
    }
    private _selectDay = async (day: string) => {
        const parent = await this._getDayElement(day);
        return parent.$('div');
    }

    private _selectAppointment = async (title: string, date: string) => {
        const parent = await this._getDayElement(date);
        return parent.$(`div*=${title}`);
    }

    private _todayButton = () => {
        return this._headerContent.$('aria/Today');
    }
    private _monthYearHeader = () => {
        return this._headerContent.$('[class*="ml-4 text-xl"]');
    }

    private _headerButtonChevronLeft = () => {
        return this._headerContent.$('span*=chevron_left');
    }
    private _headerButtonChevronRight = () => {
        return this._headerContent.$('span*=chevron_right');
    }

    private _appointmentModalTitle = $('[placeholder="Add title"]')
    private _appointmentModalDate = () => {
        return this._appointmentModalTitle.$('..').$('p');
    }
    private _appointmentModalDescription = () => {
        return this._appointmentModalTitle.$('..').$('[name="description"]')
    }

    private _appointmentModalColorIcon = (color: string) => {
        return this._appointmentModalTitle.$('..').$('..').$(`[class*="bg-${color}-500"]`);
    }

    private _appointmentColor = (color: string) => {
        return this._appointmentModalTitle.$('..').$(`[class="bg-${color}-200"]`);
    }

    private _appointmentModalSave = $(`[type="submit"]`);
    private _appointmentModalDelete = $('span*=delete');

    //Page methods
    public async openCalendarPage() {
        await openWebsite('url', <string>browser.options.baseUrl);
    }

    public async getMonthYearDisplayed() {
        const monthYear = await this._monthYearHeader().getText();
        const split = monthYear.split(' ')
        return {month: split[0], year: split[1]};
    }



    public async getAllDaysElements() {
        return this.daysDisplayed();
    }

    public async getAppointmentsOnDate(day: string) {
        const ele = await this._appointmentsOnDate(day);
        const appointments: string[] = [];
        for (const el of ele) {
            const res = await el.getText();
            appointments.push(res);
        }
        return appointments;
    }

    public async checkAppointmentColor(day: string) {
        const color = await this._appointmentColor(day).isExisting();
        expect(color).toBeTruthy();
    }

    public async clickOnDate(day: string) {
        const dateElement = await this._selectDay(day);
        return dateElement.click();
    }

    public async clickOnAppointment(title: string, day: string) {
        const appointmentElement = await this._selectAppointment(title, day);
        await appointmentElement.click();
    }

    public async isCurrentMonthDisplayed(month: string, year: string) {
        return this.mothYear(`${month} ${year}`).isDisplayed();
    }

    public async isAppointmentModalOpen() {
        return this._appointmentModalTitle.isDisplayed();
    }

    public async enterAppointmentTitle(title: string) {
        return this._appointmentModalTitle.setValue(title)
    }

    public async enterAppointmentDescription(desc: string) {
        return this._appointmentModalDescription().setValue(desc)
    }

    public async selectAppointmentColor(color?: Color) {
        if (color) {
            return this._appointmentModalColorIcon(color.toString()).click();
        }
    }

    public async saveAppointment() {
        return this._appointmentModalSave.click();
    }

    public async deleteAppointment() {
        return this._appointmentModalDelete.click();
    }

    public async clickTodayButton() {
        return this._todayButton().click();
    }

    public async clickLeftChevronHeader() {
        return this._headerButtonChevronLeft().click();
    }

    public async clickRightChevronHeader() {
        return this._headerButtonChevronRight().click();
    }

    public async navigateToMonthYear(month: string, year: string) {
        let monthYear = await this.getMonthYearDisplayed();
        while (monthYear.year !== year) {
            if (Number(monthYear.year) > Number(year)) {
                await this.clickLeftChevronHeader();
            } else {
                await this.clickRightChevronHeader();
            }
            monthYear = await this.getMonthYearDisplayed();
        }
        while (monthYear.month !== month) {
            const monthExpected = dateHelper.getMonthNumber(month)
            const displayedMonth = dateHelper.getMonthNumber(monthYear.month)
            if (displayedMonth > monthExpected) {
                await this.clickLeftChevronHeader();
            } else {
                await this.clickRightChevronHeader();
            }
            monthYear = await this.getMonthYearDisplayed();
        }
        monthYear = await this.getMonthYearDisplayed();
    }

}

export const CalendarPage = new CalendarPageObject();
