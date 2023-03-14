package com.project.meepletable.utils;

import com.project.meepletable.models.Boardgame;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;


public class XMLParser {

    public static List<Boardgame> parseBoardgameListXML(String url) {

        List<Boardgame> boardgameList = new ArrayList<>();

        //<items total="64" termsofuse="https://boardgamegeek.com/xmlapi/termsofuse">
        //  <item type="boardgame" id="317365">
        //      <name type="primary" value="Adventure Games: The Gloom City File"/>
        //      <yearpublished value="2021"/>
        //  </item>
        //  <item type="boardgame" id="119193">
        //      <name type="primary" value="Crazy Creatures of Dr. Gloom"/>
        //      <yearpublished value="2012"/>
        //  </item>
        //</items>

        //get the document builder
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        try {
            DocumentBuilder builder = factory.newDocumentBuilder();

            //get document
            Document document = builder.parse(new URL(url).openStream());

            //normalize the xml structure
            document.getDocumentElement().normalize();

            //get all element by the tag name
            Element root = document.getDocumentElement();


            NodeList bgList = root.getElementsByTagName("item");
            for (int i = 0; i < bgList.getLength(); i++) {

                Element item = (Element) bgList.item(i);
                int id = Integer.parseInt(item.getAttribute("id"));
                String type = item.getAttribute("type");
                String name = item.getElementsByTagName("name")
                        .item(0)
                        .getAttributes()
                        .getNamedItem("value")
                        .getNodeValue();

                NodeList yearPublishedList = item.getElementsByTagName("yearpublished");
                String yearPublished;
                if (yearPublishedList.getLength() > 0) {
                    yearPublished = yearPublishedList.item(0)
                            .getAttributes()
                            .getNamedItem("value")
                            .getNodeValue();
                } else {
                    yearPublished = "0";
                }


                Boardgame bg = new Boardgame(id, type, name, Integer.parseInt(yearPublished));
                boardgameList.add(bg);


            }

        } catch (ParserConfigurationException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (SAXException e) {
            throw new RuntimeException(e);
        }

        return boardgameList;

    }

    public static Boardgame parseBgDetails(String url) {

        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();

        Boardgame bg;
        try {
            DocumentBuilder builder = factory.newDocumentBuilder();

            Document document = builder.parse(new URL(url).openStream());
            document.getDocumentElement().normalize();
            Element root = document.getDocumentElement();
            NodeList bgList = root.getElementsByTagName("item");

            Element item = (Element) bgList.item(0);

            int id = Integer.parseInt(item.getAttribute("id"));

            String name = item.getElementsByTagName("name")
                    .item(0)
                    .getAttributes()
                    .getNamedItem("value")
                    .getNodeValue();

            String image = item.getElementsByTagName("image")
                    .item(0)
                    .getTextContent();

            String thumbnail = item.getElementsByTagName("thumbnail")
                    .item(0)
                    .getTextContent();

//            String description = item.getElementsByTagName("description")
//                    .item(0)
//                    .getTextContent();

            String yearPublished = item.getElementsByTagName("yearpublished")
                    .item(0)
                    .getAttributes()
                    .getNamedItem("value")
                    .getNodeValue();


            String playingTime = item.getElementsByTagName("playingtime")
                    .item(0)
                    .getAttributes()
                    .getNamedItem("value")
                    .getNodeValue();

            bg = new Boardgame(
                    id,
                    name,
                    Integer.parseInt(yearPublished),
                    thumbnail,
                    image,
                    Integer.parseInt(playingTime)
                    );


        } catch (ParserConfigurationException e) {
            throw new RuntimeException(e);
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (SAXException e) {
            throw new RuntimeException(e);
        }

        return bg;
    }

}
