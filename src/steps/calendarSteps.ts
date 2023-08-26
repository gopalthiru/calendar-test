import {Given, Then, When} from '@cucumber/cucumber';
import {CalendarPage} from "../pages/calendar.page.js";
import {dateHelper} from "../helpers/DateHelper.js";
import {browser} from "@wdio/globals";
import {DataTable} from "@wdio/cucumber-framework";
import {Color} from "../models/Color";
import saveScreenshot from "../support/lib/saveScreenshot.js";

//Steps methods

async function bookAppointment(title: string, description: string, color?: Color) {
    await CalendarPage.enterAppointmentTitle(title);
    await CalendarPage.enterAppointmentDescription(description);
    if (color) {
        await CalendarPage.selectAppointmentColor(color);
    }
    await CalendarPage.saveAppointment();
}

//Steps
Given(/^As an unauthenticated user$/, async function () {
    await browser.deleteCookies();
//Un-authenticated user - Implement method to check the user not signed in/logout
});

Given(/^As an authenticated user$/, async function () {
//authenticated user - Implement method to use login/authenticate to the service
});

When(/^I open the calendar page$/, async function () {
    await CalendarPage.openCalendarPage();
    await CalendarPage.isPageLoaded();
    await saveScreenshot('Calendar-home-page')
});

Then(/^I am on the current month$/, async function () {
    const month = dateHelper.getMonth();
    const currentMonth = dateHelper.getMonthName(month);
    const year = dateHelper.getYear();
    const check = await CalendarPage.isCurrentMonthDisplayed(currentMonth, year.toString());
    expect(check).toBeTruthy();
});

Then(/^I can view month "([^"]*)" of year "([^"]*)"$/, async function (month: string, year: string) {
    await CalendarPage.navigateToMonthYear(month, year);
});

Then(/^by clicking on today i can see curren month$/, async function () {
    await CalendarPage.clickTodayButton();
    const currentMonth = dateHelper.getMonthName(dateHelper.getMonth());
    const year = dateHelper.getYear();
    const check = await CalendarPage.getMonthYearDisplayed();
    expect(check.month).toEqual(currentMonth);
    expect(check.year).toEqual(year.toString());
});


Then(/^I book appointment on "([^"]*)" with:$/, async function (date: string, table: DataTable) {
    const index = table.rowsHash();
    const parseDate = date.split('-');

    const calDate = dateHelper.parseDate(date)
    await CalendarPage.navigateToMonthYear(calDate.monthName, calDate.year);
    await CalendarPage.clickOnDate(calDate.date);
    if (await CalendarPage.isAppointmentModalOpen()) {
        await bookAppointment(index.title, index.description, index.color);
    } else {
        throw Error("Failed to open appointment modal");
    }
});

Then(/^I can see the event "([^"]*)" on the date "([^"]*)"$/, async function (title: string, date: string) {
    const calDate = dateHelper.parseDate(date)
    await CalendarPage.navigateToMonthYear(calDate.monthName, calDate.year);
    const appointment = await CalendarPage.getAppointmentsOnDate(calDate.date);
    console.log(`Appointments: ${JSON.stringify(appointment)}`);
    expect(appointment.length).toEqual(1);
    expect(appointment[0]).toEqual(title);
});

Then(/^I will delete the event "([^"]*)" on the date "([^"]*)"$/, async function (title: string, date: string) {
    const calDate = dateHelper.parseDate(date)
    await CalendarPage.navigateToMonthYear(calDate.monthName, calDate.year);
    const appointments = await CalendarPage.getAppointmentsOnDate(calDate.date);
    expect(appointments.length).toEqual(1);
    expect(appointments[0]).toEqual(title);
    await CalendarPage.clickOnAppointment(title, calDate.date);
    if(await CalendarPage.isAppointmentModalOpen()){
        await CalendarPage.deleteAppointment();
    }else{
        throw Error("Failure during deleting the appointment");
    }
});

Then(/^I can see the no event on the date "([^"]*)"$/, async function (date: string) {
    const calDate = dateHelper.parseDate(date)
    const appointments = await CalendarPage.getAppointmentsOnDate(calDate.date);
    expect(appointments.length).toEqual(0);
});
