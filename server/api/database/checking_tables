def check_is_creating_tables(inspector):
    table_names = inspector.get_table_names()

    if "users" in table_names and "projects" in table_names:
        print("Tables 'users' and 'projects' created")
    elif "users" in table_names:
        print("Table 'users' created, but 'projects' is missing")
    elif "projects" in table_names:
        print("Table 'projects' created, but 'users' is missing")
    else:
        print("Tables 'users' and 'projects' are missing")
