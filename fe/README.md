# FE

**TODO:**
- Add token expiration to Auth
- Add automated refresh token flow

**Notes:**
- At the beginning of development there will be code duplication regarding styling. The styling of this app will follow at a later stage.
- Would definitely want to use [testing-library](https://testing-library.com/) in this project since that has quite some benefits. But to get more familiar with 'native' Angular testing I'm leaving this out at the moment. 
- Translation (i18n)
-- Add translation mechanism
-- The BE returns messages in english. Refactor so it returns i18n keys instead.
- At the moment the unit tests are testing mainly implementation details. This is to understand the system better. At a later stage replace this with TDD/BDD practices.

## Fast commands

| Description | Command |
|---|---|
| Generate shared component | `ng g c -c=OnPush --skip-import ../../shared/component-name` |
| Generate page | `ng g m /pages/page-name; ng g c -c=OnPush /pages/page-name/containers/page-name` |
