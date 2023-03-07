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
import java.net.URL;
import java.util.ArrayList;
import java.util.List;


public class XMLParser {

    public static List<Boardgame> parseBoardgameListXML(String url) {

        List<Boardgame> boardgameList = new ArrayList<>();

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
                String id = item.getAttribute("id");
                String type = item.getAttribute("type");
                String name = item.getElementsByTagName("name")
                        .item(0)
                        .getAttributes()
                        .getNamedItem("value")
                        .getNodeValue();

                String yearPublished = item.getElementsByTagName("yearpublished")
                        .item(0)
                        .getAttributes()
                        .getNamedItem("value")
                        .getNodeValue();

                Boardgame bg = new Boardgame(id, type, name, yearPublished);
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

}
