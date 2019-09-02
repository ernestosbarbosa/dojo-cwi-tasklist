#language: en
#encoding: utf-8

@wip
Feature: Testing TaskList App

    Scenario: Should display tasklist page
        Given I went to homepage
        Then should display tasklist page

    Scenario: Display tasks
        Given I went to homepage
        When I wait for load tasks
        Then should display tasklist

    Scenario: Create task
        Given I went to homepage
        And I select add task option
        And write all field
        When save taks
        Then the task is displayed into tasklist
