Feature: Calendar Tests

#  As an unauthenticated user,
#  I want to be able to click through the months of the year,
#  so that I can view all the days of the month
  @User-Story-1
  Scenario Outline: As an unauthenticated user I want to view month of the year
    Given As an unauthenticated user
    When I open the calendar page
    Then I am on the current month
    And I can view month "<month>" of year "<year>"
    Then by clicking on today i can see curren month

    Examples:
      | month    | year |
      | May      | 2022 |
      | January  | 2023 |
      | December | 2023 |
      | February | 2025 |

  Scenario: As an authenticated user I want to book an appointment for a given date
    Given As an authenticated user
    When I open the calendar page
    Then I am on the current month
    And I book appointment on "15-September-2025" with:
      | title       | Vacation         |
      | description | I am on Vacation |
      | color       | green            |
    Then I can see the event "Vacation" on the date "15-September-2025"

  Scenario: As an authenticated user I want book appointment on right date if month view has duplicate dates
    Given As an authenticated user
    When I open the calendar page
    Then I am on the current month
    And I book appointment on "28-July-2023" with:
      | title       | Testing duplicate date                        |
      | description | Testing when month view shows duplicate dates |
    Then I can see the event "Testing duplicate date" on the date "28-July-2023"

#  As an authenticated user, I want to be able to add a diary event to the calendar,
#  so that I can keep track of my appointments.
#  As an authenticated user, I want to be able to delete a diary event that has already been created,
#  so that I can remove a diary event that is no longer required.
  @User-Story-2   @User-Story-3
  Scenario: As an authenticated user I book and cancel an appointment
    Given As an authenticated user
    When I open the calendar page
    Then I am on the current month
    And I book appointment on "10-August-2023" with:
      | title       | Gopal Thirumurthy Interview (DONE)        |
      | description | Interview for Gopal Thirumurthy completed |
    Then I can see the event "Gopal Thirumurthy Interview (DONE)" on the date "10-August-2023"
    And I will delete the event "Gopal Thirumurthy Interview (DONE)" on the date "10-August-2023"
    Then I can see the no event on the date "10-August-2023"
