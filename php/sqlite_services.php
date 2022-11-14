<?php
class Sqlite {
  public function open_db($db_name) {
    $db = new SQLite3("/Applications/MAMP/htdocs/BibTexManager/db/sqlite/" . $db_name . ".db");
    $db->exec("CREATE TABLE IF NOT EXISTS entrys(
          id INTEGER PRIMARY KEY,
          lit_type TEXT,
          entry_time INTEGER)");
    $db->exec("CREATE TABLE IF NOT EXISTS literature(
          id INTEGER PRIMARY KEY,
          entry_id INTEGER,
          doi TEXT,
          url TEXT,
          issn TEXT,
          isbn TEXT,
          title TEXT,
          author TEXT,
          publisher TEXT,
          editor TEXT,
          address TEXT,
          year INTEGER,
          month TEXT,
          journal TEXT,
          volume TEXT,
          number TEXT,
          chapter TEXT,
          pages TEXT,
          edition TEXT,
          note TEXT)");
  }
  public function load_lit($db_name) {
    $db = new SQLite3("/Applications/MAMP/htdocs/BibTexManager/db/sqlite/".$db_name.".db");
    $results = $db -> query("SELECT author, title, journal, year, doi FROM literature");
    while ($row = $results->fetchArray(SQLITE3_ASSOC)) {
        echo "<tr>";
            echo "<td>".$row["author"]."</td>";
            echo "<td>".$row["title"]."</td>";
            echo "<td>".$row["journal"]."</td>";
            echo "<td>".$row["year"]."</td>";
            echo "<td>".$row["doi"]."</td>";
        echo "</tr>";
    }
  }
  public function entry_lit($db_name, $lit_array) {
    $db = new SQLite3("/Applications/MAMP/htdocs/BibTexManager/db/sqlite/" . $db_name . ".db");
    $db->exec("INSERT INTO entrys(lit_type, entry_time) VALUES('{$lit_array["type"]}', time())");
    $last_row_id = $db->lastInsertRowID();
    if ($lit_array["type"] == "article") {
      $db->exec("INSERT INTO literature(entry_id, 
                       doi,
                       issn,
                       isbn,
                       title, 
                       author,
                       publisher,
                       year,
                       month,
                       journal,
                       volume,
                       number,
                       chapter,
                       pages,
                       edition,
                       note) 
                       VALUES($last_row_id, 
                              '{$lit_array["doi"]}',
                              '{$lit_array["issn"]}',
                              '{$lit_array["isbn"]}',
                              '{$lit_array["title"]}', 
                              '{$lit_array["author"]}',
                              '{$lit_array["publisher"]}',
                              '{$lit_array["year"]}',
                              '{$lit_array["month"]}',
                              '{$lit_array["journal"]}',
                              '{$lit_array["volume"]}',
                              '{$lit_array["number"]}',
                              '{$lit_array["chapter"]}',
                              '{$lit_array["pages"]}',
                              '{$lit_array["edition"]}',
                              '{$lit_array["note"]}')");
        }
    }
}