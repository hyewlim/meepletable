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

    public void saveCollection(List<Boardgame> bgList, String userId) {

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


        for (Boardgame bg: bgList) {
            jdbcTemplate.update(SQL_INSERT_COMMENT, userId, bg.getId(), bg.getComment());

        }



    }

    public List<Boardgame> getCollection(String userId) {

        return jdbcTemplate.query(SQL_GET_COLLECTION,
                (rs, rowNum) -> new Boardgame(
                        rs.getInt("bg_id"),
                        rs.getString("title"),
                        rs.getInt("year_published"),
                        rs.getString("thumbnail"),
                        rs.getString("image"),
                        rs.getInt("playing_time"),
                        rs.getString("comment")
                ), userId);

    }

    public int deleteCollection(String userId, int bgId) {

        return jdbcTemplate.update(SQL_DELETE_COLLECTION, userId, bgId);

    }
}
