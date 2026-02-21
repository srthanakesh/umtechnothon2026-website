## Moving forward: How to update the tasks in the frontend?

I have inserted two `// TODO` comments in the code. The first one is where you need to add the new task to the list of tasks. The second one is where you need to update the task in the list of tasks.

```jsx
// line 114 in FormsAndSubmission.jsx
      <h2 className="text-xl md:text-2xl text-black font-bold my-4">
        // TODO: Step 1: Update date here
        WEEK 1: 19 May 2025 - 26 May 2025
      </h2>
```

Your task here is to update the week and date. Meanwhile for this block:

```jsx
// line 15 in FormsAndSubmission.jsx
    // TODO: Step 2: Replace task id with the correct one here.
    const taskId = 5;
```

Your task here is to update the taskId. This will require someone with database access such as Saiket, so team members just work with each other.

Once done, you guys can push directly to the `main` branch.

Then, open a pull request into `release-v2.0` branch.

### CHECK that the only changes you made are in the `FormsAndSubmission.jsx` file and no other random changes are found.

If there are random changes, either revert them if you know you accidentally did it, or tag me(Jonas) to check.

Otherwise, you may merge it yourselves and check it out in www.umtechnothon.com.