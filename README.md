# ButterCal Core

ButterCal Core is a JavaScript library which allows you to create custom datepickers in any framework.

## Docs are still in progress, check back soon!

## Creating a new calendar

```javascript
const calendar = new Calendar();
```

## Customizing the calendar

```javascript
const calendar = new Calendar(new Date('Dec 25, 1995'), {
  monthsToShow: 2,
  labelTemplate: (day) => {
    return `Today's timestamp is ${day.ts}`;
  }
});
```

## Methods

### nextMonth()

```javascript
calendar.nextMonth();
```

### prevMonth()

```javascript
calendar.nextMonth();
```

### setMonths(date, monthsToShow)

```javascript
calendar.setMonths(new Date('Dec 25, 2040'));
```


## Events

### monthChanged

### selectionChanged