---
title: "Basic Git commands and Terminologies"
date: 2023-11-10
draft: true
---

## Git commands

1. `git init`
    This command is used for initialising the currect directory as a git repository. Currrently, `git init -b main` is preferred as git switched to `main` as the primary branch and using this command will initialise the repository with `main` as the default branch.
    
2. `git clone`
    This command is used for cloning a remote repository to the current directory. The full syntax for it is `git clone <remote-repository-link>`.
    
3. `git add`
    Used for adding files with uncommitted changes to the staging area.
    
4. `git commit`
    Creates a new commit of the changes present on the staging area.
    
5. `git push`
    Pushes the local changes to a remote repository.
    
6. `git pull`
    Pulls the changes from the remote repository to local.

7. `git fetch`
    Fetches the latest changes from a remote repository, but does not merge them into your local repository.
    
## Merge Conflict

Merge conflicts occur when combining two branches that have modification on the same part of one or more files.

Imagine there is a branch, `branch-A` which you are currently in and another branch`branch-B`. These two branches have modification to the same part of the same file and we are trying to merge `branch-B` to `branch-A`.

1. To begin the merge operation, run `git merge branch-B`. Since both the files modify the same part of code, merge conflict will arise.
2. The parts with merge conflicts will be marked
    ```
    <<<<<<< HEAD
    // Your changes
    =======
    // Changes from the branch-B
    >>>>>>> branch-B
    ```
    The section between `<<<<<<< HEAD` and `=======` represents your changes in `branch-A`, while the section between `======` and `>>>>>>>` represents the changes from the `branch-B`.
    
3. We can manually clear the merge conflicts by removing the uneeded part of the code along with the conflict markers using a text editor.
4. After that, add the changed files using the command `git add <file_name>`
5. Complete the merge oprations using `git merge --continue`
6. Now we can commit the uncommitted changes using `git commit -m "Merge branch-B into branch-A"`
8. Now the branches are succesfully merged and conflicts resolved. 

## `.gitignore` usage

`.gitignore` is a text file that contains a list of untracked file or directory names that should be ignored by Git. The files/directories that are usually mentioned in `.gitignore` include:
1. **Build Artifacts and binaries:** Many times temporary files, binary files, configs etc are generated during the build process and doesnt need to be tracked by Git.
    ex:
    ```
    build/
    *.exe
    *.o
    ```
2. **Dependency directories:** The directories where dependencies are stored are usually ignored as they need to be present only locally such as `node_modules` for npm.
3. **Configuration and Environment specific files:** These files are usually specific to the environment or should be hidden from the repo for security reasons as it might contain API keys or passwords. `.env` file where the environment variables are stored is an example of a file that is added to `.gitignore`.