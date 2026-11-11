# Evidence

Each workflow needs proof that it ran for real before the project lists it as tested.

For every workflow, this folder will hold a file named after it (for example `ssh-deploy.md`) with:

- a link to a real run in a throwaway repo, including a failing run where it makes sense (a rollback, a failed health check)
- a short log excerpt of the steps that matter
- the date and the versions of the actions and tools used

A workflow with no evidence file is not tested, and the README says so. There is no evidence here yet because no workflow exists yet.
