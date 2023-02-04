#!/bin/bash
clickhouse-client --query="CREATE DATABASE univer_schedule"
clickhouse-client --database=univer_schedule --query="CREATE TABLE teachers(id UUID, name String) ENGINE = MergeTree() ORDER BY tuple()" 
clickhouse-client --database=univer_schedule --query="CREATE TABLE subjects(id UUID, title String, teachers_ids Array(UUID)) ENGINE = MergeTree() ORDER BY tuple()" 
clickhouse-client --database=univer_schedule --query="CREATE TABLE groups(id UUID, title String) ENGINE = MergeTree() ORDER BY tuple()" 
clickhouse-client --database=univer_schedule --query="CREATE TABLE students(id UUID, name String, group_id UUID) ENGINE = MergeTree() ORDER BY tuple()"
clickhouse-client --database=univer_schedule --query="CREATE TABLE semesters(id UUID, start_date Date, end_date Date) ENGINE = MergeTree() ORDER BY tuple()"
clickhouse-client --database=univer_schedule --query="CREATE TABLE classes(id UUID, semester_id UUID, teacher_id UUID, group_id UUID, subject_id UUID, weeekday String, audience String, start_time String, is_even_day Boolean) ENGINE = MergeTree() ORDER BY tuple()" 

. groups.txt
. students.txt
. teachers.txt
. subjects.txt
. semesters.txt
. classes.txt
