package com.project.meepletable.repositories;

import com.project.meepletable.models.Boardgame;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import static com.project.meepletable.repositories.Queries.*;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

@Repository
public class GamesRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void saveCollection(List<Boardgame> bgList, int userId) {

        jdbcTemplate.batchUpdate(SQL_INSERT_COLLECTION, new BatchPreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                Boardgame bg = bgList.get(i);
                ps.setInt(1, bg.getId());
                ps.setString(2, bg.getName());
                ps.setInt(3, bg.getYearPublished());
                ps.setString(4, bg.getThumbnail());
                ps.setString(5, bg.getImage());
                ps.setInt(6, bg.getPlayingTime());
            }

            @Override
            public int getBatchSize() {
                return bgList.size();
            }
        });



    }
}
