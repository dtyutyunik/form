# Course Goal Tracker

A simple course goal tracker built with React and TypeScript. This project demonstrates TypeScript best practices, including handling component props, leveraging TypeScript's type inference, and managing conditional props in a React project.

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Project Structure](#project-structure)
- [TypeScript Best Practices](#typescript-best-practices)
  - [Combining Props for Type Safety](#combining-props-for-type-safety)
  - [Using `FC<>` for Functional Components](#using-fc-for-functional-components)
- [Code Examples](#code-examples)
  - [Goal Severity Calculation](#goal-severity-calculation)
  - [InfoBox Component Prop Management](#infobox-component-prop-management)
- [Contributing](#contributing)
- [License](#license)

## Overview

This project is a basic goal tracking application where users can add, view, and manage course goals. The focus of this app is on implementing React components with TypeScript to ensure robust type checking, maintainability, and scalability.

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/course-goal-tracker.git
   cd course-goal-tracker
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Running the App

To start the app in development mode, run:

```bash
npm start
```

The app will be accessible at `http://localhost:3000`.

## Project Structure

```plaintext
src/
├── components/
│   ├── CourseGoal.tsx
│   ├── CourseGoalList.tsx
│   └── InfoBox.tsx
├── App.tsx
├── index.tsx
└── types/
    └── GoalTypes.ts
```

## TypeScript Best Practices

### Combining Props for Type Safety

In this project, the `InfoBox` component uses two different prop types: `HintBoxProps` and `WarningBoxProps`. These are combined using a **discriminated union** to ensure that the `warningType` prop is only required when the `mode` is `"warning"`. This approach ensures that the developer is guided correctly when passing props:

```typescript
type HintBoxProps = {
  mode: "hint";
  children: ReactNode;
};

type WarningBoxProps = {
  mode: "warning";
  warningType: "low" | "medium" | "high";
  children: ReactNode;
};

// Union type for InfoBoxProps
type InfoBoxProps = HintBoxProps | WarningBoxProps;
```

By splitting the prop types and then combining them, we ensure that `warningType` is not accidentally missed when `mode` is set to `"warning"`. This type-safety mechanism is one of TypeScript's key advantages, preventing runtime errors and improving code reliability.

### Using `FC<>` for Functional Components

In the `CourseGoalList.tsx` and `CourseGoal.tsx` files, the `React.FC<>` (or `React.FunctionComponent<>`) type is used to type functional components. This is especially useful when defining components that accept children or specific props:

```typescript
import React, { FC } from 'react';

type CourseGoalProps = {
  title: string;
  description: string;
  id: number;
  onDelete: (id: number) => void;
};

const CourseGoal: FC<CourseGoalProps> = ({ title, description, id, onDelete }) => {
  return (
    <div className="course-goal">
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
};
```

Using `FC<>` simplifies the typing of components and automatically includes the `children` prop, which is often useful in React.

## Code Examples

### Goal Severity Calculation

The app dynamically calculates goal severity based on the number of goals added. Instead of manually defining string literals like `'low' | 'medium' | 'high'` in multiple places, we reference the `WarningBoxProps['warningType']` type directly:

```typescript
type WarningType = WarningBoxProps['warningType'];

const goalLevelWarning = (goalLength: number): WarningType => {
  if (goalLength >= 8) {
    return 'high';
  } else if (goalLength >= 5) {
    return 'medium';
  } else {
    return 'low';
  }
};
```

This keeps the code DRY and ensures consistent usage across the app.

### InfoBox Component Prop Management

The `InfoBox` component handles both "hint" and "warning" modes with different requirements. By using a discriminated union type, we enforce that `warningType` is required only when the mode is `"warning"`:

```typescript
export const InfoBox = (props: InfoBoxProps) => {
  const { children, mode } = props;

  if (mode === "hint") {
    return (
      <aside className="infobox infobox-hint">
        <p>{children}</p>
      </aside>
    );
  }

  // Extract warningType safely, knowing it's present in warning mode
  const { warningType } = props as WarningBoxProps;
  return (
    <aside className={`infobox infobox-warning warning--${warningType}`}>
      <h2>Warning</h2>
      <p>{children}</p>
    </aside>
  );
};
```

This structure ensures the component behaves correctly based on the `mode` while maintaining strong type safety.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any feature requests or bug reports.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

